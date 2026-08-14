import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Google Gen AI client with required User-Agent header
const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Health & Model Capabilities Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/gemini/models", (req, res) => {
  res.json({
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    availableModels: {
      textModels: [
        { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash (Fast, Recommended Text & Orchestrator)", default: true },
        { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro (Deep Complex Reasoning & Narrative Arcs)", default: false },
        { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite (High-Speed Scratchpad & Sub-Tasks)", default: false },
      ],
      imageModels: [
        { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image (High-Res Illustrations & Aspect Control)", default: true },
        { id: "gemini-3.1-flash-lite-image", name: "Gemini 3.1 Flash Lite Image (Standard Fast Illustration)", default: false },
      ],
    },
  });
});

// 2. Generate Chapter / Scene / Book Outline
app.post("/api/gemini/generate-chapter", async (req, res) => {
  try {
    const {
      bookTitle,
      bookType,
      chapterNumber,
      chapterTitle,
      userInstruction,
      model = "gemini-3.7-flash",
      globalBible,
      rollingSummary,
      previousChapterSummary,
      continuityFacts = [],
      targetPageCount = 3,
    } = req.body;

    const ai = getAiClient();

    // Prepare Character Bible details with LOCKED traits
    const characterContext = globalBible?.characters?.map((c: any) => 
      `- ${c.name} (${c.role}): Locked Traits [${c.lockedTraits?.join(", ") || "None"}]. Current State: "${c.currentEmotionalState || "Normal"}". Secrets: "${c.secrets || "None"}". Voice: "${c.voiceStyle || "Standard"}". Goal: "${c.arcGoal || "None"}"`
    ).join("\n") || "No characters registered.";

    // Active Continuity Facts
    const activeFacts = continuityFacts
      .filter((f: any) => f.active)
      .map((f: any) => `* [FACT]: ${f.fact}`)
      .join("\n") || "No previous continuity facts.";

    const systemInstruction = `You are the master author and orchestration engine for STORYFORGE, a professional publishing studio for adult authors.
You write evocative, high-craft, non-cliché fiction, comics, or educational manuals according to strict continuity and character constraints.

BOOK CONTEXT:
Title: "${bookTitle}"
Format: ${bookType}
Writing Style Guide: ${globalBible?.writingStyleGuide || "Literary, engaging, sensory depth, sharp pacing"}
Visual Style Guide: ${globalBible?.visualStyleGuide || "Vibrant cinematic graphic novel art"}
World Lore & Rules: ${JSON.stringify(globalBible?.worldRules || [])}

LEVEL 1 & 2 MEMORY BUFFER:
Rolling Story Summary:
${rollingSummary || "Story begins here."}

Previous Chapter Summary:
${previousChapterSummary || "This is Chapter 1."}

Active Continuity Facts:
${activeFacts}

CHARACTER BIBLE (LOCKED TRAITS MUST BE HONORED):
${characterContext}

INSTRUCTIONS:
Generate Chapter ${chapterNumber}: "${chapterTitle || "Untitled"}".
Break the chapter into 1-2 scenes, and structured pages (approximately ${targetPageCount} pages).
Each page must contain structured elements: headings, rich paragraphs, formatted dialogue with speaker tags, illustration prompts (if illustrated novel or comic), and scene breaks.
Avoid clichés and generic tropes. Maintain strict character continuity and emotional weight.`;

    const prompt = `User Direction for Chapter ${chapterNumber}:
"${userInstruction || "Advance the plot with rising tension and character revelations."}"

Output JSON matching this exact structure:
{
  "chapterTitle": "string",
  "summary": "string (condensed summary of key events for the rolling buffer)",
  "unresolvedThreads": ["string"],
  "extractedFacts": [
    { "fact": "string (e.g. FACT: Maria now knows Tomas is lying)", "category": "character_knowledge" }
  ],
  "scenes": [
    {
      "title": "string",
      "location": "string",
      "charactersPresent": ["string"],
      "timeOfDay": "string",
      "purpose": "string",
      "pages": [
        {
          "layout": "prose" | "illustrated_half_top" | "illustrated_half_bottom" | "illustrated_full" | "illustrated_floating_left" | "comic_4panel" | "manual_lesson",
          "elements": [
            {
              "type": "paragraph" | "dialogue" | "illustration" | "heading" | "quote" | "exercise_box",
              "content": "string",
              "speaker": "string (optional for dialogue)",
              "imagePrompt": "string (rich visual prompt incorporating locked visual style & character traits if type is illustration)",
              "imagePosition": "half_top" | "half_bottom" | "full" | "float_left" | "float_right"
            }
          ]
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in generate-chapter:", error);
    res.status(500).json({ error: error.message || "Failed to generate chapter" });
  }
});

// 3. Continue Story / Continue From Here
app.post("/api/gemini/continue-story", async (req, res) => {
  try {
    const {
      bookTitle,
      bookType,
      currentChapterTitle,
      precedingPagesText,
      userInstruction,
      model = "gemini-3.7-flash",
      globalBible,
      rollingSummary,
      continuityFacts = [],
      characterStates = [],
      startFromPage = null,
    } = req.body;

    const ai = getAiClient();

    const systemInstruction = `You are the continuation engine of STORYFORGE.
Perform an internal Context Integrity Check before generating:
1. Who is in the scene?
2. Where are they located?
3. When is this happening?
4. What do they know / not know?
5. What do they want right now?
6. What just happened in the immediate preceding 2-3 pages?
7. What active unresolved problems or consequences exist?

Do NOT restart or re-summarize the story. Seamlessly pick up the narrative thread from the last sentence and continue with immediate momentum and sensory details.`;

    const prompt = `BOOK: "${bookTitle}" (${bookType})
STYLE: ${globalBible?.writingStyleGuide || "Literary and immersive"}

ROLLING SUMMARY:
${rollingSummary || "Beginning of the tale."}

ACTIVE CONTINUITY FACTS:
${continuityFacts.map((f: any) => `* ${f.fact}`).join("\n")}

IMMEDIATE PRECEDING TEXT (LAST 2-3 PAGES):
"""
${precedingPagesText || "No preceding text."}
"""

USER'S INSTRUCTION FOR CONTINUATION:
"${userInstruction || "Continue the scene naturally, escalating character tension."}"
${startFromPage ? `(Branching continuation from Page ${startFromPage})` : ""}

Generate the next 1-2 pages of narrative content formatted in JSON:
{
  "pages": [
    {
      "layout": "prose" | "illustrated_half_top" | "illustrated_half_bottom" | "comic_4panel",
      "elements": [
        {
          "type": "paragraph" | "dialogue" | "illustration" | "scene_break",
          "content": "string",
          "speaker": "string (optional)",
          "imagePrompt": "string (optional)",
          "imagePosition": "half_top" | "half_bottom" | "full" | "float_left"
        }
      ]
    }
  ],
  "newFacts": ["string (durable atomic facts established in these pages)"],
  "sceneConsequence": "string"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in continue-story:", error);
    res.status(500).json({ error: error.message || "Failed to continue story" });
  }
});

// 4. Extract Durable Facts and Update Rolling Summary Buffer
app.post("/api/gemini/extract-facts", async (req, res) => {
  try {
    const { chapterText, existingFacts = [], currentRollingSummary = "", model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const prompt = `Analyze this chapter text and update the book's long-term memory:
1. Extract 2-5 durable atomic facts (e.g. "FACT: Maria now knows Tomas is lying", "FACT: Tomas hid the ledger under the floorboards").
2. Produce an updated, condensed rolling summary combining previous events with the new developments.

CURRENT ROLLING SUMMARY:
${currentRollingSummary || "None"}

EXISTING FACTS:
${existingFacts.map((f: any) => f.fact).join("; ")}

NEW CHAPTER TEXT:
"""
${chapterText}
"""

Return JSON:
{
  "updatedRollingSummary": "string (concise, high-density overview of the entire story arc to date)",
  "extractedFacts": [
    {
      "fact": "string",
      "category": "character_knowledge" | "item_location" | "world_state" | "plot_event" | "timeline"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in extract-facts:", error);
    res.status(500).json({ error: error.message || "Failed to extract facts" });
  }
});

// 5. Generate Illustration (With Visual Style Lock & Character Bible Traits)
app.post("/api/gemini/generate-illustration", async (req, res) => {
  try {
    const {
      prompt,
      visualStyleGuide = "Cinematic illustrated graphic novel with warm tones and expressive ink linework",
      colorPalette = ["#1e293b", "#d97706", "#f8fafc", "#0284c7"],
      charactersInScene = [],
      characterBible = [],
      aspectRatio = "1:1",
      model = "gemini-3.1-flash-image",
    } = req.body;

    const ai = getAiClient();

    // Match characters present and fetch their LOCKED traits
    const lockedCharacterDescriptions = charactersInScene.map((charName: string) => {
      const match = characterBible.find((c: any) => c.name.toLowerCase() === charName.toLowerCase());
      if (match && match.lockedTraits?.length) {
        return `Character ${match.name}: [LOCKED TRAITS: ${match.lockedTraits.join(", ")}]`;
      }
      return `Character ${charName}`;
    }).join("; ");

    const compiledPrompt = `Master Book Illustration: ${prompt}.
Visual Style Lock: ${visualStyleGuide}.
Color Palette: ${colorPalette.join(", ")}.
${lockedCharacterDescriptions ? `Character Consistency: ${lockedCharacterDescriptions}.` : ""}
Quality: Highly detailed, published book illustration, balanced composition, atmospheric lighting, no unwanted text or logos.`;

    try {
      const response = await ai.models.generateContent({
        model: model || "gemini-3.1-flash-image",
        contents: {
          parts: [{ text: compiledPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
          },
        },
      });

      let imageUrl: string | null = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageUrl) {
        return res.json({ success: true, imageUrl, prompt: compiledPrompt });
      }
    } catch (genAiError: any) {
      console.warn("Direct image generation with GenAI image model failed or required specific key:", genAiError.message);
    }

    // Fallback: Generate an SVG/Canvas artistic book illustration vector data URI
    // styled with the exact scene, palette, and locked traits
    const svgIllustration = generateArtisticFallbackSvg(prompt, visualStyleGuide, colorPalette);
    res.json({
      success: true,
      imageUrl: svgIllustration,
      prompt: compiledPrompt,
      fallbackUsed: true,
    });
  } catch (error: any) {
    console.error("Error in generate-illustration:", error);
    res.status(500).json({ error: error.message || "Failed to generate illustration" });
  }
});

// 6. Manual Innovation Engine Tools
app.post("/api/gemini/manual-lab", async (req, res) => {
  try {
    const {
      toolType, // 'story_autopsy' | 'dilemma_machine' | 'scene_surgery' | 'cliche_detector' | 'trope_inversion' | 'consequence_machine' | 'voice_lab' | 'pressure_cooker' | 'ending_lab'
      inputText,
      characterName,
      options = {},
      model = "gemini-3.7-flash",
    } = req.body;

    const ai = getAiClient();

    const toolPrompts: Record<string, { system: string; user: string }> = {
      story_autopsy: {
        system: "You are a master story editor and dramaturg. Perform an uncompromising, forensic STORY AUTOPSY on the user's submitted scene.",
        user: `Submit Scene for Autopsy:
"""
${inputText}
"""
Provide structured JSON:
{
  "whatWorks": ["Detailed point 1", "Detailed point 2"],
  "whatFails": ["Detailed point 1", "Detailed point 2"],
  "tensionDropPoints": ["Specific sentence or beat where reader momentum stalls"],
  "motivationAmbiguities": ["Where character intent feels murky or unearned"],
  "scenePivotRecommendation": "Actionable proposal on how to sharply turn the scene on a dime"
}`,
      },
      dilemma_machine: {
        system: "You are a dramatic conflict specialist. Generate high-stakes, agonizing philosophical and practical dilemmas for a character.",
        user: `Character: "${characterName || "Protagonist"}"
Context / Story Stakes:
"""
${inputText}
"""
Generate 3 distinct, irreconcilable dilemmas (where both choices carry irreversible costs). Return JSON:
{
  "dilemmas": [
    {
      "title": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "thematicResonance": "string"
    }
  ]
}`,
      },
      scene_surgery: {
        system: "You are a surgical developmental editor. Propose three distinct structural repairs for a scene.",
        user: `Scene Text:
"""
${inputText}
"""
Return JSON:
{
  "diagnosis": "What is structurally malfunctioning in this scene",
  "repairs": [
    {
      "approach": "In Media Res & Cut the Front",
      "explanation": "string",
      "sampleRewriteOpening": "string"
    },
    {
      "approach": "Subtext Inversion (Say the Opposite)",
      "explanation": "string",
      "sampleRewriteOpening": "string"
    },
    {
      "approach": "Escalate the Clock / Stakes",
      "explanation": "string",
      "sampleRewriteOpening": "string"
    }
  ]
}`,
      },
      cliche_detector: {
        system: "You are an anti-cliché sentinel for high-end literature and comics. Identify hackneyed tropes, stale dialogue, and predictable plot beats, and give fresh subversions.",
        user: `Text to Scan:
"""
${inputText}
"""
Return JSON:
{
  "clichesFound": [
    {
      "phraseOrTrope": "string",
      "whyItIsStale": "string",
      "boldAlternative": "string"
    }
  ],
  "originalityScore": 82,
  "verdict": "string"
}`,
      },
      trope_inversion: {
        system: "You specialize in taking standard literary and pop-culture tropes and radically reversing expectations while preserving emotional truth.",
        user: `Trope or Scene:
"""
${inputText}
"""
Return JSON:
{
  "tropeIdentified": "string",
  "standardExpectation": "string",
  "inversions": [
    {
      "inversionName": "string",
      "plotExecution": "string",
      "psychologicalImpact": "string"
    }
  ]
}`,
      },
      consequence_machine: {
        system: "You are a narrative causality engine. Given one character decision, generate five escalating, plausible, and domino-effect consequences.",
        user: `Character Decision / Action:
"""
${inputText}
"""
Return JSON:
{
  "decision": "string",
  "consequences": [
    { "level": "Immediate (Hours)", "outcome": "string", "unforeseenCost": "string" },
    { "level": "Secondary (Days)", "outcome": "string", "unforeseenCost": "string" },
    { "level": "Tertiary (Weeks)", "outcome": "string", "unforeseenCost": "string" },
    { "level": "Systemic (World/Relationship)", "outcome": "string", "unforeseenCost": "string" },
    { "level": "Inevitable Payoff (Climax)", "outcome": "string", "unforeseenCost": "string" }
  ]
}`,
      },
      voice_lab: {
        system: "You are a master of narrative voice and cadence. Rewrite the user's passage in 4 distinctly varied voices.",
        user: `Original Passage:
"""
${inputText}
"""
Return JSON:
{
  "voices": [
    { "styleName": "Hardboiled Noir / Cynical Minimalist", "rewrite": "string" },
    { "styleName": "Lyrical Gothic / Opulent Interiority", "rewrite": "string" },
    { "styleName": "Satirical / Deadpan Bureaucratic", "rewrite": "string" },
    { "styleName": "Fast-Paced Comic Punch / Hyper-Kinetic", "rewrite": "string" }
  ]
}`,
      },
      pressure_cooker: {
        system: "You are a dramatic tension amplifier. Confine the characters to their current location and generate a 4-stage escalation of psychological conflict without letting anyone leave.",
        user: `Scene / Setting:
"""
${inputText}
"""
Return JSON:
{
  "settingBoundary": "string",
  "stages": [
    { "stage": 1, "pressureSource": "string", "escalationBeat": "string" },
    { "stage": 2, "pressureSource": "string", "escalationBeat": "string" },
    { "stage": 3, "pressureSource": "string", "escalationBeat": "string" },
    { "stage": 4, "pressureSource": "string", "escalationBeat": "string" }
  ]
}`,
      },
      ending_lab: {
        system: "You are a climactic resolution engineer. Generate 3 contrasting endings based on different thematic conclusions.",
        user: `Story Summary / Conflict:
"""
${inputText}
"""
Return JSON:
{
  "endings": [
    { "thematicFocus": "Tragic Irony", "synopsis": "string", "finalImage": "string" },
    { "thematicFocus": "Pyhrric Victory / Hard-Earned Growth", "synopsis": "string", "finalImage": "string" },
    { "thematicFocus": "Ambiguous Transcendence / The Open Horizon", "synopsis": "string", "finalImage": "string" }
  ]
}`,
      },
    };

    const toolConfig = toolPrompts[toolType] || toolPrompts.story_autopsy;

    const response = await ai.models.generateContent({
      model,
      contents: toolConfig.user,
      config: {
        systemInstruction: toolConfig.system,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed, toolType });
  } catch (error: any) {
    console.error("Error in manual-lab:", error);
    res.status(500).json({ error: error.message || "Failed to process manual tool" });
  }
});

// =========================================================================
// STRUCTURED STORY INPUT SYSTEM & BLUEPRINT GENERATION ENDPOINTS
// =========================================================================

// 1. Suggest field value or generate 3-4 options
app.post("/api/gemini/story-input/suggest-field", async (req, res) => {
  try {
    const { fieldName, fieldLabel, archetype, currentFormData, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are an elite developmental editor and narrative architect for STORYFORGE.
Given the current story context and archetype (${archetype}), generate a creative, high-craft suggestion and 3 distinct alternatives for the field "${fieldLabel}" (${fieldName}).
Do NOT use clichés, standard tropes, or generic filler. Provide punchy, evocative, and character-driven suggestions.`;

    const prompt = `Story Context so far:
${JSON.stringify(currentFormData || {}, null, 2)}

Target Field: "${fieldLabel}" (${fieldName})
Return JSON with this exact structure:
{
  "bestSuggestion": "string",
  "reasoning": "brief explanation of why this creates narrative leverage",
  "options": [
    "Option 1 (Dramatic/Intense)",
    "Option 2 (Subversive/Ironical)",
    "Option 3 (Character-Focused/Emotional)"
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in suggest-field:", error);
    res.status(500).json({ error: error.message || "Failed to suggest field" });
  }
});

// 2. Surprise Me: Generate a full cohesive structured input dataset
app.post("/api/gemini/story-input/surprise-me", async (req, res) => {
  try {
    const { archetype, seedIdea, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a master book architect and author creating a complete, highly original, non-cliché book concept for the "${archetype}" format in STORYFORGE.
Adapt to the genre:
- For fiction / graphic novels: Generate compelling protagonist, external goal, internal flaw, conflict, stakes, and unique hook.
- For scholarly monographs / research nonfiction: Focus on central thesis, research question, methodology, historiographical gap, and evidence scope (do not invent fictional protagonists unless requested).
- For practical handbooks / field guides: Focus on handbook purpose, target audience, diagnostic procedures, checklists, and operational stakes.
- For trivia & quiz books: Focus on question categories, difficulty progression, sample fascinating facts, and quiz round formats.
- For pop-science: Focus on the central cosmic/scientific question, thought experiments, explanatory domain, and philosophical wonder.
- For craft manuals: Focus on learning objectives, pedagogy style, workshop drills, and practical outputs.`;

    const prompt = `Generate a complete structured input proposal for archetype: "${archetype}".
${seedIdea ? `User Seed Idea: "${seedIdea}"` : "Create an innovative, fresh concept."}

Return a valid JSON object matching the structured input fields for this genre. Mark the generated values with tier: "AI_SUGGESTION".
Include all relevant core and specialized fields (e.g. coreIdea, oneSentencePremise, tone, endingPreference, centralThesis, handbookPurpose, triviaCategory, popScienceCentralQuestion, protagonistName, protagonistWant, stakes, etc.).

Return pure JSON:
{
  "title": "string",
  "subtitle": "string",
  "formData": {
    "coreIdea": { "value": "string", "tier": "AI_SUGGESTION" },
    "oneSentencePremise": { "value": "string", "tier": "AI_SUGGESTION" },
    "protagonistName": { "value": "string", "tier": "AI_SUGGESTION" },
    "protagonistWant": { "value": "string", "tier": "AI_SUGGESTION" },
    "protagonistNeed": { "value": "string", "tier": "AI_SUGGESTION" },
    "primaryObstacle": { "value": "string", "tier": "AI_SUGGESTION" },
    "stakes": { "value": "string", "tier": "AI_SUGGESTION" },
    "uniqueHook": { "value": "string", "tier": "AI_SUGGESTION" },
    "centralThesis": { "value": "string", "tier": "AI_SUGGESTION" },
    "researchQuestion": { "value": "string", "tier": "AI_SUGGESTION" },
    "handbookPurpose": { "value": "string", "tier": "AI_SUGGESTION" },
    "handbookAudience": { "value": "string", "tier": "AI_SUGGESTION" },
    "triviaCategory": { "value": "string", "tier": "AI_SUGGESTION" },
    "popScienceCentralQuestion": { "value": "string", "tier": "AI_SUGGESTION" },
    "tone": { "value": "string", "tier": "AI_SUGGESTION" },
    "endingPreference": { "value": "string", "tier": "AI_SUGGESTION" }
  }
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in surprise-me:", error);
    res.status(500).json({ error: error.message || "Failed to generate surprise story" });
  }
});

// 3. Help Me Develop This: complete missing fields while honoring user facts
app.post("/api/gemini/story-input/develop-form", async (req, res) => {
  try {
    const { archetype, currentFormData, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a world-class story development consultant.
The user has provided some story facts and preferences for archetype: "${archetype}".
CRITICAL DIRECTIVE:
1. NEVER overwrite or alter any field marked with tier "USER_FACT" or "USER_PREFERENCE".
2. Fill in all empty, missing, or weak fields with logically inferred suggestions (tagging them as "AI_SUGGESTION" or "AI_INFERRED").
3. Ensure every inferred element ties back causally to the user's established facts.`;

    const prompt = `Current User Inputs:
${JSON.stringify(currentFormData, null, 2)}

Analyze what the author has supplied and expand it into a cohesive narrative foundation.
Return pure JSON with the expanded formData object preserving existing user facts and adding new fields with tier "AI_SUGGESTION" or "AI_INFERRED".
Also return a summary of your narrative diagnosis and why these suggestions elevate the story.

{
  "diagnosis": "What makes this story exciting and where it needed reinforcement",
  "formData": { ... },
  "keyRecommendations": ["string"]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in develop-form:", error);
    res.status(500).json({ error: error.message || "Failed to develop story form" });
  }
});

// 4. Generate Master 11-point Story Blueprint
app.post("/api/gemini/story-input/generate-blueprint", async (req, res) => {
  try {
    const { archetype, formData, bookTitle, authorName, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are the Master Story Architect at STORYFORGE.
Transform the provided structured story inputs into an exhaustive, publication-grade 11-point STORY BLUEPRINT.
The blueprint must be concrete, specific, free of clichés, and structurally watertight.
It will serve as the master narrative constitution for generating chapters, managing memory, and guiding illustrations.`;

    const prompt = `Story Archetype: ${archetype}
Book Title: ${bookTitle || "Untitled Story"}
Author: ${authorName || "Author"}

User Structured Inputs:
${JSON.stringify(formData, null, 2)}

Construct the 11-point STORY BLUEPRINT. Return valid JSON matching this exact structure:
{
  "title": "string",
  "subtitle": "string",
  "archetype": "${archetype}",
  "premise": "string (The core premise expanded with sharp narrative tension)",
  "storyPromise": "string (What experience, feeling, or realization does this book promise the reader?)",
  "mainCharacters": [
    {
      "name": "string",
      "role": "protagonist" | "antagonist" | "supporting" | "mentor" | "foil",
      "lockedTraits": ["string", "string"],
      "bio": "string",
      "externalGoal": "string",
      "internalNeed": "string",
      "flaw": "string",
      "secret": "string",
      "voiceStyle": "string"
    }
  ],
  "characterArcs": [
    {
      "characterName": "string",
      "startingState": "string",
      "catalystPressure": "string",
      "midpointShift": "string",
      "pointOfNoReturn": "string",
      "finalTransformation": "string"
    }
  ],
  "centralConflict": {
    "coreOpposingForces": "string",
    "philosophicalStakes": "string",
    "consequencesOfFailure": "string"
  },
  "majorDilemmas": [
    {
      "title": "string (e.g. Truth vs Survival)",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "thematicWeight": "string"
    }
  ],
  "escalationStructure": [
    {
      "stage": 1,
      "title": "Inciting Anomaly",
      "description": "string",
      "causalTrigger": "string"
    },
    {
      "stage": 2,
      "title": "Complication & First Price",
      "description": "string",
      "causalTrigger": "string"
    },
    {
      "stage": 3,
      "title": "Midpoint Crisis & False Safety",
      "description": "string",
      "causalTrigger": "string"
    },
    {
      "stage": 4,
      "title": "Total Collapse & Point of No Return",
      "description": "string",
      "causalTrigger": "string"
    },
    {
      "stage": 5,
      "title": "The Agonizing Choice & Climax",
      "description": "string",
      "causalTrigger": "string"
    }
  ],
  "subplots": [
    {
      "name": "string",
      "characters": ["string"],
      "coreTension": "string",
      "connectionToMainPlot": "string",
      "resolutionBeat": "string"
    }
  ],
  "chapterArchitecture": [
    {
      "chapterNumber": 1,
      "title": "string",
      "summary": "string",
      "coreSceneBeats": ["string", "string"],
      "visualPromptOrIllustrationNote": "string",
      "continuityFactsEstablished": ["string"]
    },
    {
      "chapterNumber": 2,
      "title": "string",
      "summary": "string",
      "coreSceneBeats": ["string", "string"],
      "visualPromptOrIllustrationNote": "string",
      "continuityFactsEstablished": ["string"]
    },
    {
      "chapterNumber": 3,
      "title": "string",
      "summary": "string",
      "coreSceneBeats": ["string", "string"],
      "visualPromptOrIllustrationNote": "string",
      "continuityFactsEstablished": ["string"]
    },
    {
      "chapterNumber": 4,
      "title": "string",
      "summary": "string",
      "coreSceneBeats": ["string", "string"],
      "visualPromptOrIllustrationNote": "string",
      "continuityFactsEstablished": ["string"]
    }
  ],
  "visualDirection": {
    "visualTone": "string",
    "colorPalette": ["#1e293b", "#d97706", "#f8fafc", "#0284c7"],
    "recurringSymbols": ["string"],
    "pageLayoutStyle": "illustrated_half_top" | "prose" | "comic_4panel" | "manual_lesson",
    "artNotes": "string"
  },
  "endingStrategy": {
    "thematicResolution": "string",
    "characterPayoff": "string",
    "finalImage": "string",
    "lingeringResonance": "string"
  }
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, blueprint: parsed });
  } catch (error: any) {
    console.error("Error in generate-blueprint:", error);
    res.status(500).json({ error: error.message || "Failed to generate story blueprint" });
  }
});

// 5. Narrative Power Tool: MAKE THIS STORY RICHER
app.post("/api/gemini/story-input/make-richer", async (req, res) => {
  try {
    const { formData, blueprint, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a master developmental editor specializing in story depth, subtext, and thematic layering.
Your job is to make this story richer by adding intricate character dynamics, hidden secrets, reversals, motifs, and subplots.
For every suggestion, explicitly explain "Why this helps the story" without fluff.`;

    const prompt = `Current Story Foundation:
${JSON.stringify({ formData, blueprint }, null, 2)}

Return pure JSON matching this exact structure:
{
  "whyThisHelps": "Executive summary of the dramatic potential unlocked by these enrichment layers",
  "suggestedSubplots": [
    { "title": "string", "characters": "string", "conflict": "string", "payoff": "string" }
  ],
  "characterTensions": [
    { "characters": "string", "tension": "string", "subtext": "string" }
  ],
  "hiddenSecrets": [
    { "bearer": "string", "secret": "string", "discoveryTrigger": "string" }
  ],
  "reversalsAndTwists": [
    { "timing": "string (e.g. Midpoint, Act III)", "reversal": "string", "whyItWorks": "string" }
  ],
  "moralDilemmas": [
    { "choice": "string", "stakes": "string" }
  ],
  "recurringMotifs": [
    { "symbol": "string", "meaning": "string", "appearanceLocations": "string" }
  ],
  "foreshadowingBeats": ["string", "string", "string"]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in make-richer:", error);
    res.status(500).json({ error: error.message || "Failed to make story richer" });
  }
});

// 6. Narrative Power Tool: MAKE IT HARDER
app.post("/api/gemini/story-input/make-harder", async (req, res) => {
  try {
    const { formData, blueprint, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a conflict and tension engineer.
Scan the story for places where characters get off too easily, where obstacles lack teeth, or where success is predictable.
Generate 9 distinct categories of escalations (Physical, Emotional, Social, Financial, Moral, Intellectual, Relational, Time-based, Existential).`;

    const prompt = `Story Premise & Arc:
${JSON.stringify({ formData, blueprint }, null, 2)}

Return pure JSON:
{
  "weakAreasIdentified": ["Where the story is currently too easy or convenient for the protagonist"],
  "obstacles": [
    {
      "id": "obs_1",
      "category": "Physical" | "Emotional" | "Social" | "Financial" | "Moral" | "Intellectual" | "Relational" | "Time-based" | "Existential",
      "challenge": "string",
      "howItComplicatesGoal": "string",
      "status": "pending"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in make-harder:", error);
    res.status(500).json({ error: error.message || "Failed to make story harder" });
  }
});

// 7. Narrative Power Tool: WHAT COULD GO WRONG?
app.post("/api/gemini/story-input/what-could-go-wrong", async (req, res) => {
  try {
    const { decisionOrAction, storyContext, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a narrative causality and Murphy's Law specialist for fiction.
Given a character action or story premise, systematically analyze the fallout across multiple severity vectors.`;

    const prompt = `Action / Plot Point:
"${decisionOrAction}"

Context:
${JSON.stringify(storyContext || {}, null, 2)}

Generate:
- 3 plausible consequences that could logically occur
- 3 severe consequences that escalate the danger
- 3 unexpected consequences that subvert expectations
- 1 consequence that directly attacks the protagonist's primary flaw or weakness
- 1 consequence that opens a major new plot opportunity

Return JSON:
{
  "plausibleConsequences": ["string", "string", "string"],
  "severeConsequences": ["string", "string", "string"],
  "unexpectedConsequences": ["string", "string", "string"],
  "weaknessAttackingConsequence": "string",
  "futurePlotOpportunityConsequence": "string"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in what-could-go-wrong:", error);
    res.status(500).json({ error: error.message || "Failed to analyze consequences" });
  }
});

// 8. Narrative Power Tool: NOVELIST'S ROOM
app.post("/api/gemini/story-input/novelists-room", async (req, res) => {
  try {
    const { formData, blueprint, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a room of senior novelists, showrunners, and developmental editors.
Conduct a rigorous story review. Be candid, intellectually rigorous, and constructively incisive.
Identify passive character traps, unearned stakes, predictable arcs, and propose high-octane actionable alternatives.`;

    const prompt = `Story Material for Review:
${JSON.stringify({ formData, blueprint }, null, 2)}

Return pure JSON matching this exact structure:
{
  "whatIsWorking": ["string", "string"],
  "whereIsTooEasy": ["string", "string"],
  "whereIsProtagonistPassive": ["string"],
  "whereStakesAreUnclear": ["string"],
  "subplotsNeedingExpansion": ["string"],
  "relationshipsNeedingPressure": ["string"],
  "reversalOpportunities": ["string"],
  "predictableMoments": ["string"],
  "unresolvedThreadsToReturn": ["string"],
  "deepeningDilemmaProposal": "string",
  "unnecessaryElementsToRemove": ["string"],
  "actionableAlternatives": [
    {
      "title": "Alternative Pivot A",
      "action": "What to change immediately in the outline",
      "impact": "Why this creates a far more compelling book"
    },
    {
      "title": "Alternative Pivot B",
      "action": "What to change immediately in the outline",
      "impact": "Why this creates a far more compelling book"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in novelists-room:", error);
    res.status(500).json({ error: error.message || "Failed to execute Novelist's Room" });
  }
});

// 9. Writing Manual Curriculum & 7-Tier Exercise Generator
app.post("/api/gemini/story-input/generate-exercises", async (req, res) => {
  try {
    const { learningObjective, subject, audience, teachingStyle, model = "gemini-3.7-flash" } = req.body;
    const ai = getAiClient();

    const systemInstruction = `You are a master creative writing professor and author of acclaimed craft manuals.
Design a specialized lesson curriculum with 7 distinct tiers of exercises (Easy, Standard, Difficult, Professional, Absurd, Real-World Application).`;

    const prompt = `Learning Objective: "${learningObjective || "Mastering Dialogue Subtext"}"
Subject Area: "${subject || "Dialogue"}"
Audience Level: "${audience || "Intermediate"}"
Teaching Style: "${teachingStyle || "Witty, workshop-focused, story-driven"}"

Return pure JSON:
{
  "lessonTitle": "string",
  "coreConcept": "string (sharp, insightful pedagogical explanation)",
  "exerciseTiers": {
    "easy": {
      "title": "Tier 1: Warmup & Observation",
      "prompt": "string",
      "goal": "string"
    },
    "standard": {
      "title": "Tier 2: Core Craft Application",
      "prompt": "string",
      "goal": "string"
    },
    "difficult": {
      "title": "Tier 3: High-Constraint Challenge",
      "prompt": "string",
      "goal": "string"
    },
    "professional": {
      "title": "Tier 4: Subtext & Multi-Layer Mastery",
      "prompt": "string",
      "goal": "string"
    },
    "absurd": {
      "title": "Tier 5: Defamiliarization & Surreal Constraints",
      "prompt": "string",
      "goal": "string"
    },
    "realWorld": {
      "title": "Tier 6: Professional Publishing & Scene Surgery",
      "prompt": "string",
      "goal": "string"
    }
  }
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in generate-exercises:", error);
    res.status(500).json({ error: error.message || "Failed to generate exercises" });
  }
});

// 10. Specialized Genre Action Engine (e.g. "MAKE IT MORE ABSURD", "CREATE ATMOSPHERIC PLATE", "ADD RED HERRING", "SPLASH PAGE", "INVENT TECHNOLOGY", etc.)
app.post("/api/gemini/story-input/genre-action", async (req, res) => {
  try {
    const {
      archetype,
      actionKey,
      actionLabel,
      formData,
      blueprint,
      characterContext = "",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are the specialized AI Engine for "${archetype}" within STORYFORGE publishing studio.
You execute professional genre-specific narrative, visual, and comedic transformations with surgical precision.
Avoid clichés. Return actionable narrative elements that immediately elevate the story's craft.`;

    const prompt = `EXECUTE SPECIALIZED GENRE ACTION: "${actionLabel}" (${actionKey})
GENRE / ARCHETYPE: ${archetype}
CURRENT STORY FORM DATA:
${JSON.stringify(formData || {}, null, 2)}
CURRENT BLUEPRINT (if any):
${JSON.stringify(blueprint || {}, null, 2)}
CHARACTER CONTEXT:
${characterContext || "Standard cast"}

Based on the specialized genre mandates for "${archetype}":
Generate the outcome for this action.
Return JSON with this structure:
{
  "actionKey": "${actionKey}",
  "actionLabel": "${actionLabel}",
  "title": "string (A punchy headline for the result)",
  "narrativeAddition": "string (Rich prose, scene beat, or rule definition)",
  "craftAnalysis": "string (Why this mechanically strengthens the narrative)",
  "suggestedPatch": {
    "fieldName": "value"
  },
  "bulletPoints": ["string", "string", "string"],
  "visualPrompt": "string (if visual or comic/art action)"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error("Error in genre-action:", error);
    res.status(500).json({ error: error.message || "Failed to execute genre action" });
  }
});

// 11. Universal 10-Level Interlocking Dilemma Chain Reaction Engine
app.post("/api/gemini/story-input/generate-dilemma-chain", async (req, res) => {
  try {
    const {
      archetype = "universal",
      formData,
      characterName = "Protagonist",
      mode = "10_chain", // '3_quick' | '10_chain' | 'escalating_reaction'
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are a master story architect specializing in interlocking character dilemmas and causal chain reactions.
For adult, sophisticated literature and graphic storytelling, a dilemma is never simple ("should I do good or bad?").
It is an agonizing choice where both options carry heavy costs, values collide, and solving one problem immediately sparks the next complication.
Generate the strict 10-Level Interlocking Chain Reaction:
Level 1: Immediate practical problem
Level 2: Personal consequence
Level 3: Relationship complication
Level 4: Moral conflict
Level 5: Unexpected consequence
Level 6: False solution
Level 7: Reversal
Level 8: Irreversible choice
Level 9: New problem caused by the choice
Level 10: Long-term consequence`;

    const prompt = `Construct an interlocking dilemma chain for Character: "${characterName}" in Genre: "${archetype}".
Story Context:
${JSON.stringify(formData || {}, null, 2)}

Mode: ${mode}

Return JSON matching:
{
  "characterName": "${characterName}",
  "archetype": "${archetype}",
  "dilemmaChainSummary": "string (overview of how this sequence creates unstoppable dramatic propulsion)",
  "levels": [
    {
      "level": 1,
      "stageName": "Immediate Practical Problem",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 2,
      "stageName": "Personal Consequence",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 3,
      "stageName": "Relationship Complication",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 4,
      "stageName": "Moral Conflict",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 5,
      "stageName": "Unexpected Consequence",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 6,
      "stageName": "False Solution",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 7,
      "stageName": "Reversal",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 8,
      "stageName": "Irreversible Choice",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 9,
      "stageName": "New Problem Caused by Choice",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    },
    {
      "level": 10,
      "stageName": "Long-term Consequence",
      "dilemmaTitle": "string",
      "choiceA": "string",
      "costA": "string",
      "choiceB": "string",
      "costB": "string",
      "forcedDecision": "string",
      "leadsToNext": "string"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, chain: parsed });
  } catch (error: any) {
    console.error("Error in generate-dilemma-chain:", error);
    res.status(500).json({ error: error.message || "Failed to generate dilemma chain" });
  }
});

// 12. Specialized Author Lab & Genre Exercise Engine
app.post("/api/gemini/story-input/genre-exercise", async (req, res) => {
  try {
    const {
      archetype,
      exerciseId,
      exerciseTitle,
      storyContext,
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const prompt = `You are the master craft instructor at STORYFORGE for genre "${archetype}".
Generate the complete interactive laboratory exercise for:
EXERCISE: "${exerciseTitle}" (${exerciseId})

Story Context:
${JSON.stringify(storyContext || {}, null, 2)}

Provide:
1. Exercise Mission & Craft Objective
2. Creative Constraints (3-4 strict rules to force mastery)
3. Step-by-Step Prompt
4. A Demonstration Example showing high-craft execution
5. Revision Challenge Checklist

Return JSON:
{
  "exerciseId": "${exerciseId}",
  "exerciseTitle": "${exerciseTitle}",
  "genre": "${archetype}",
  "mission": "string",
  "constraints": ["string", "string", "string"],
  "starterPrompt": "string",
  "demonstration": "string (a masterclass excerpt demonstrating the technique)",
  "revisionChecklist": ["string", "string", "string"]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, exercise: parsed });
  } catch (error: any) {
    console.error("Error in genre-exercise:", error);
    res.status(500).json({ error: error.message || "Failed to generate genre exercise" });
  }
});

// 13. Fair-Play Mystery Logic & Clue Auditor
app.post("/api/gemini/story-input/check-mystery-logic", async (req, res) => {
  try {
    const {
      mysterySetup,
      suspects = [],
      clues = [],
      solution,
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are a forensic mystery editor and Golden Age Fair-Play Mystery referee.
Golden Age Fair-Play Rule: The solution MUST be logically derivable from clues and evidence established and available to the reader BEFORE the reveal.
No hidden twins, unmentioned poisons, or sudden psychic deductions. Flag any clue or fact that appears only after the solution or lacks causality.`;

    const prompt = `AUDIT MYSTERY LOGIC & FAIR-PLAY COMPLIANCE:
Crime Setup:
${JSON.stringify(mysterySetup || {}, null, 2)}

Suspect Matrix:
${JSON.stringify(suspects, null, 2)}

Clue Ledger:
${JSON.stringify(clues, null, 2)}

Proposed Solution:
${JSON.stringify(solution || "Undisclosed", null, 2)}

Audit and return JSON:
{
  "isFairPlay": boolean,
  "fairPlayScore": 88,
  "verdict": "string",
  "missingCluesNeeded": ["string"],
  "flaggedPostSolutionClues": ["string (clues that appear only at the end and feel unearned)"],
  "redHerringEvaluation": "string (are the false leads credible without being deceptive?)",
  "logicalDeductionSteps": [
    { "step": 1, "evidence": "string", "logicalInference": "string" },
    { "step": 2, "evidence": "string", "logicalInference": "string" },
    { "step": 3, "evidence": "string", "logicalInference": "string" }
  ],
  "watertightnessChecklist": [
    { "item": "Motive verified for all suspects", "passed": true },
    { "item": "Opportunity timeline watertight", "passed": true },
    { "item": "Means logically accessible", "passed": true },
    { "item": "Reader has all necessary facts before reveal", "passed": true }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, audit: parsed });
  } catch (error: any) {
    console.error("Error in check-mystery-logic:", error);
    res.status(500).json({ error: error.message || "Failed to check mystery logic" });
  }
});

// 14. Universal Genre-Specific Magic Tool & Exercise Engine
app.post("/api/gemini/genre/execute-tool", async (req, res) => {
  try {
    const {
      workspaceId = "monograph",
      toolId,
      toolName,
      actionType,
      promptTemplate,
      bookContext = {},
      activeInputText = "",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const systemInstruction = `You are the master domain specialist and publishing director for the STORYFORGE Genre Workspace: "${workspaceId}".
You execute the specialized publishing tool "${toolName}" (${toolId} / ${actionType}).
Provide rigorous, domain-accurate, professional output tailored specifically to this genre.
Avoid generic conversational filler or introductory meta-commentary; deliver the structured result directly.
If requested to format as JSON, provide valid JSON matching the requested structure.`;

    const prompt = `GENRE WORKSPACE: ${workspaceId}
SPECIALIZED TOOL: "${toolName}" (Action: ${actionType})
INSTRUCTION / OBJECTIVE: ${promptTemplate}

AUTHOR'S CURRENT BOOK CONTEXT:
${JSON.stringify(bookContext, null, 2)}

USER PROVIDED INPUT / SELECTION:
"${activeInputText || "Apply to full book blueprint and active chapter."}"

Execute this specialized genre action with pristine domain craftsmanship:`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    const outputText = response.text || "";
    res.json({
      success: true,
      result: {
        workspaceId,
        toolId,
        toolName,
        actionType,
        text: outputText,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error("Error in execute-tool:", error);
    res.status(500).json({ error: error.message || "Failed to execute genre magic tool" });
  }
});

// 15. Universal Genre Dilemma Engine (Chain Reaction Generator)
app.post("/api/gemini/genre/generate-dilemmas", async (req, res) => {
  try {
    const {
      workspaceId = "fiction",
      mode = "chain_10", // 'generate_3' | 'generate_10' | 'chain_10' | 'craft_7_level'
      character = {},
      storyContext = {},
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const systemInstruction = `You are the master narrative architect and drama engineer for the STORYFORGE Genre Workspace: "${workspaceId}".
You construct interlocking, high-stakes story dilemmas that force impossible choices and create cascading narrative consequences.
Avoid superficial choices (e.g., "fight or flee"); instead, build structural dilemmas where every option carries profound internal, relational, or moral costs.`;

    let prompt = "";
    if (mode === "craft_7_level") {
      prompt = `GENRE: ${workspaceId}
TASK: Generate a 7-Level Escalating Craft Dilemma Sequence for the writer's character/story.

CHARACTER & STORY CONTEXT:
${JSON.stringify({ character, storyContext }, null, 2)}

Provide the complete 7-level progressive craft dilemma sequence:
LEVEL 1: Immediate External Problem
LEVEL 2: Conflicting Internal Desire
LEVEL 3: Solving the external problem worsens the internal problem
LEVEL 4: Force an impossible choice between two non-negotiable needs
LEVEL 5: The character's chosen solution triggers the next major catastrophe
LEVEL 6: Reveal the character fundamentally misunderstood the original problem
LEVEL 7: The character must choose between two core values they genuinely cherish

For each level, describe the exact situation, the stakes, the tragic or dramatic tension, and the structural momentum it generates.`;
    } else if (mode === "chain_10") {
      prompt = `GENRE: ${workspaceId}
TASK: Generate an Interlocking 10-Stage Dilemma Chain Reaction for this character.

CHARACTER PROFILE:
- Name: ${character.name || "Protagonist"}
- Want: ${character.want || "Primary objective"}
- Need: ${character.need || "Deep growth requirement"}
- Fear: ${character.fear || "Greatest dread"}
- Secret: ${character.secret || "Hidden vulnerability/past action"}
- Flaw: ${character.flaw || "Fatal blindspot"}
- Moral Boundary: ${character.moralBoundary || "What they will never cross"}
- External Problem: ${character.externalProblem || storyContext.coreIdea || "Central conflict"}

STORY CONTEXT:
${JSON.stringify(storyContext, null, 2)}

Generate the 10-stage chain reaction where each consequence directly ignites the next dilemma:
1. DILEMMA 1: Immediate practical problem
2. DILEMMA 2: Personal consequence
3. DILEMMA 3: Relationship complication
4. DILEMMA 4: Moral conflict
5. DILEMMA 5: Unexpected consequence
6. DILEMMA 6: False solution
7. DILEMMA 7: Reversal
8. DILEMMA 8: Irreversible choice
9. DILEMMA 9: New problem caused by the choice
10. DILEMMA 10: Long-term consequence

Format with crisp, punchy headings and high-tension narrative logic.`;
    } else {
      const count = mode === "generate_3" ? 3 : 10;
      prompt = `GENRE: ${workspaceId}
TASK: Generate ${count} distinct, genre-authentic professional dilemmas for this narrative context.

CONTEXT:
${JSON.stringify({ character, storyContext }, null, 2)}

Generate ${count} compelling, non-trivial dilemmas with clear stakes, conflicting values, and no easy answers.`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction }
    });

    res.json({
      success: true,
      result: {
        workspaceId,
        mode,
        text: response.text || "",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error("Error in generate-dilemmas:", error);
    res.status(500).json({ error: error.message || "Failed to generate story dilemmas" });
  }
});

// ============================================================================
// UNIVERSAL BOOK STYLE & ART DIRECTION ENGINE ENDPOINTS
// ============================================================================

// 1. Generate Coordinated Color Palette
app.post("/api/gemini/style/generate-palette", async (req, res) => {
  try {
    const {
      mood = "atmospheric",
      genre = "Fiction",
      artStyle = "Editorial Illustration",
      historicalPeriod = "Contemporary",
      character = "",
      setting = "",
      userSelectedColor = "#d97706",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are a master book designer, color theorist, and publishing art director.
Generate a sophisticated, WCAG-compliant, high-contrast, coherent color palette for a book based on the author's visual parameters.
Avoid generic AI cliché gradients or muddy tones. Provide distinct HEX codes.`;

    const prompt = `Design a master book color palette with:
- Mood: "${mood}"
- Genre: "${genre}"
- Art Style: "${artStyle}"
- Historical Period / Era: "${historicalPeriod}"
- Character / Setting Context: "${character} in ${setting}"
- Base Color Anchor: "${userSelectedColor}"

Output JSON matching:
{
  "primary": "HEX string (dark dominant for headings/structure)",
  "secondary": "HEX string (subordinate structural tone)",
  "accent1": "HEX string (key focal highlight/callout)",
  "accent2": "HEX string (secondary subtle accent)",
  "background": "HEX string (page backdrop, e.g. #f8fafc or #09090b)",
  "text": "HEX string (readable body text)",
  "muted": "HEX string (subdued captions/headers)",
  "border": "HEX string (subtle dividers)",
  "highlight": "HEX string (soft tint for exercise/callout boxes)",
  "illustrationPalette": ["HEX1", "HEX2", "HEX3", "HEX4", "HEX5"],
  "designRationale": "string (1-2 sentences explaining why this color system elevates the story's themes)"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, palette: parsed });
  } catch (error: any) {
    console.error("Error in generate-palette:", error);
    res.status(500).json({ error: error.message || "Failed to generate color palette" });
  }
});

// 2. Harmonize Chapter Colors
app.post("/api/gemini/style/harmonize-chapter-colors", async (req, res) => {
  try {
    const {
      baseColor = "#d97706",
      chapterCount = 5,
      chapterTitles = [],
      mood = "atmospheric",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are a master book typographer and colorist.
Create a series of harmonized, elegant chapter accent colors that belong to one cohesive visual identity while giving each chapter a distinct character.`;

    const prompt = `Harmonize chapter accent colors for ${chapterCount} chapters.
Base Theme Color: "${baseColor}"
Mood: "${mood}"
Chapter Titles: ${JSON.stringify(chapterTitles)}

Output JSON matching:
{
  "chapterColors": {
    "1": "HEX color string",
    "2": "HEX color string",
    "3": "HEX color string",
    "4": "HEX color string",
    "5": "HEX color string"
  },
  "harmonyConcept": "string (brief explanation of the color progression)"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in harmonize-chapter-colors:", error);
    res.status(500).json({ error: error.message || "Failed to harmonize chapter colors" });
  }
});

// 3. AI Art Director ("Make It Look Better")
app.post("/api/gemini/style/ai-art-director", async (req, res) => {
  try {
    const {
      bookTitle,
      genre,
      masterStyle,
      currentPageData,
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are the AI Chief Art Director for a prestigious publishing house.
Inspect the book's current typographic hierarchy, color contrast, illustration medium, page balance, and visual consistency.
Identify flaws, visual drift, poor font pairings, competing colors, or layout imbalances, and provide actionable, high-craft corrections.`;

    const prompt = `BOOK TITLE: "${bookTitle}"
GENRE: "${genre}"
CURRENT MASTER STYLE PROFILE:
${JSON.stringify(masterStyle, null, 2)}

CURRENT PAGE CONTEXT:
${JSON.stringify(currentPageData, null, 2)}

Analyze and return an expert diagnostic audit with actionable improvements in JSON:
{
  "overallAestheticScore": 88,
  "artisticAssessment": "string (2-3 sentences concise critique of current visual strengths and weaknesses)",
  "recommendations": [
    {
      "id": "rec-1",
      "category": "typography" | "color" | "illustration" | "composition" | "chapter_opener",
      "title": "string (e.g. Increase Chapter Heading Scale for Dramatic Impact)",
      "diagnosis": "string (e.g. Heading font size is currently 18pt which competes with body lead text at 14pt)",
      "proposedFix": "string (e.g. Elevate H1 to 28pt and apply letterSpacing -0.02em)",
      "impact": "high" | "medium" | "subtle",
      "patch": {
        "typographyHierarchy": {
          "h1": { "sizePt": 28, "letterSpacing": -0.02 }
        }
      }
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, audit: parsed });
  } catch (error: any) {
    console.error("Error in ai-art-director:", error);
    res.status(500).json({ error: error.message || "Failed to run AI Art Director analysis" });
  }
});

// 4. Style Match Tool (Extract Reusable Style Profile from Reference / Image / Moodboard)
app.post("/api/gemini/style/style-match", async (req, res) => {
  try {
    const {
      referenceText = "",
      imageDescription = "",
      moodBoardNotes = "",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are a master book aesthetician and visual reverse-engineering system.
Analyze visual style descriptions, moodboards, or extracted reference text, and synthesize a complete, professional, publication-ready MasterStyleProfile.`;

    const prompt = `Reverse engineer and construct a complete MasterStyleProfile based on this visual reference:
REFERENCE MATERIAL:
${referenceText}
${imageDescription ? `IMAGE / MOODBOARD NOTES: ${imageDescription}` : ""}
${moodBoardNotes ? `DESIGNER NOTES: ${moodBoardNotes}` : ""}

Return JSON with a complete, coherent style system:
{
  "name": "string (e.g. 1920s Bauhaus Monograph / Parisian Noir)",
  "preset": "custom",
  "description": "string",
  "typographyHierarchy": {
    "h1": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 800, "sizePt": 30, "lineHeight": 1.15, "letterSpacing": -0.02 },
    "h2": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 700, "sizePt": 22, "lineHeight": 1.25, "letterSpacing": -0.01 },
    "h3": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 600, "sizePt": 16, "lineHeight": 1.3, "letterSpacing": 0 },
    "h4": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 600, "sizePt": 13, "lineHeight": 1.35, "letterSpacing": 0.02 },
    "body": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt": 11, "lineHeight": 1.55, "letterSpacing": 0 },
    "leadParagraph": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt": 12.5, "lineHeight": 1.6, "letterSpacing": 0.01 },
    "quote": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt": 11.5, "lineHeight": 1.5, "letterSpacing": 0.01, "isItalic": true },
    "caption": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 400, "sizePt": 9, "lineHeight": 1.4, "letterSpacing": 0.02 },
    "dialogue": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt": 11, "lineHeight": 1.5, "letterSpacing": 0 },
    "footnote": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt": 8.5, "lineHeight": 1.3, "letterSpacing": 0 },
    "exercise": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 500, "sizePt": 10.5, "lineHeight": 1.45, "letterSpacing": 0 },
    "example": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt": 10, "lineHeight": 1.4, "letterSpacing": 0, "isItalic": true },
    "warning": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 600, "sizePt": 10.5, "lineHeight": 1.4, "letterSpacing": 0.01 },
    "tip": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 500, "sizePt": 10.5, "lineHeight": 1.45, "letterSpacing": 0 },
    "callout": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 500, "sizePt": 10.5, "lineHeight": 1.45, "letterSpacing": 0 },
    "pullQuote": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 600, "sizePt": 16, "lineHeight": 1.35, "letterSpacing": -0.01, "isItalic": true },
    "comicSpeechBubble": { "family": "Comic Sans MS", "fallback": "sans-serif", "generic": "display", "weight": 700, "sizePt": 10, "lineHeight": 1.2, "letterSpacing": 0.02 }
  },
  "colorPalette": {
    "primary": "#HEX",
    "secondary": "#HEX",
    "accent1": "#HEX",
    "accent2": "#HEX",
    "background": "#HEX",
    "text": "#HEX",
    "muted": "#HEX",
    "border": "#HEX",
    "highlight": "#HEX",
    "illustrationPalette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],
    "lockedPalette": true,
    "paletteVariation": "exact"
  },
  "pageDesign": {
    "pageSize": "6x9",
    "orientation": "portrait",
    "margins": { "topMm": 20, "bottomMm": 20, "leftMm": 18, "rightMm": 18 },
    "columns": 1,
    "guttersMm": 4,
    "grid": "golden_ratio",
    "headerText": "COLLECTED EDITIONS",
    "headerPosition": "top_outside",
    "footerText": "",
    "pageNumberPosition": "bottom_outside",
    "imagePlacement": "top",
    "textImageBalance": 35
  },
  "artDirection": {
    "medium": "editorial_illustration" | "oil_painting" | "watercolor" | "graphic_novel" | "charcoal" | "vector_illustration",
    "lineQuality": "clean" | "rough" | "sketchy" | "painterly" | "heavy" | "fine" | "no_visible_line",
    "texture": "smooth" | "paper_texture" | "canvas" | "rough_brush" | "grain" | "ink_texture" | "print_texture" | "halftone",
    "rendering": "flat" | "semi_flat" | "painterly" | "highly_rendered" | "realistic" | "stylized" | "caricature" | "minimal",
    "intensitySliders": {
      "realismVsStylization": 50,
      "minimalVsDetailed": 60,
      "cleanVsRough": 30,
      "subtleVsExaggerated": 40
    },
    "adultStoryMode": true,
    "adultAesthetic": "sophisticated_editorial" | "literary_illustration" | "dark_satire" | "noir" | "surrealism"
  },
  "chapterDesign": {
    "chapterOpener": "split_text_image" | "large_number" | "drop_cap" | "large_title" | "full_illustration",
    "chapterTemplate": "illustrated_novel" | "classic_novel" | "comic" | "writing_manual" | "magazine",
    "numberFormat": "CHAPTER 01",
    "showSubtitle": true,
    "openingQuotation": true,
    "openingIllustration": true,
    "dropCap": true,
    "dropCapLines": 3,
    "decorativeElement": "geometric_line" | "fleuron" | "double_rule" | "filigree",
    "chapterColors": { "1": "#HEX", "2": "#HEX", "3": "#HEX" },
    "autoHarmonizeColors": true
  },
  "lightingSystem": {
    "globalLighting": "dramatic" | "studio" | "candlelight" | "golden_hour" | "high_contrast" | "soft",
    "sceneLightingOverrides": {}
  },
  "compositionSystem": {
    "defaultShot": "cinematic" | "medium_shot" | "dynamic_diagonal" | "centered"
  },
  "comicVisualLanguage": {
    "panelBorders": true,
    "panelThicknessPt: 1.5,
    "panelShape": "sharp" | "rounded" | "organic",
    "speechBubbleDefault": "classic" | "rounded" | "sharp" | "whisper" | "thought",
    "captionBoxStyle": "box_top",
    "soundEffectsStyle": "bold_comic",
    "letteringStyle": "clean_grotesk",
    "actionLines": false,
    "motionBlur": false,
    "backgroundDetail": "selective",
    "halftone": false,
    "panelDensity": "dynamic",
    "gutterSizeMm": 4,
    "readingDirection": "left_to_right",
    "splashPagesAllowed": true,
    "doublePageSpreads": false,
    "insetPanels": true,
    "characterBubbleStyles": {}
  },
  "coverDesign": {
    "theme": "editorial" | "classic" | "bold" | "comic" | "luxury" | "noir",
    "layoutStyle": "poster" | "centered" | "split" | "modern",
    "titleFont": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 800, "sizePt": 34, "lineHeight": 1.1, "letterSpacing": 0 },
    "subtitleFont": { "family": "string", "fallback": "serif", "generic": "serif", "weight": 400, "sizePt: 13, "lineHeight": 1.35 },
    "authorFont": { "family": "string", "fallback": "sans-serif", "generic": "sans-serif", "weight": 700, "sizePt": 11, "lineHeight": 1.2, "letterSpacing": 0.1, "textTransform": "uppercase" },
    "genre": "string",
    "mainIllustrationPrompt": "string",
    "bgColor": "#HEX",
    "textColor": "#HEX",
    "accentColor": "#HEX",
    "decorativeFrame": "gold_border" | "minimal_rule" | "none",
    "spineWidthMm": 14,
    "backCover": {
      "synopsis": "string",
      "authorBio": "string",
      "tagline": "string",
      "quote": "string",
      "seriesInfo": "string",
      "isbn": "978-0-00000-000-0",
      "publisherInfo": "string",
      "barcodeVisible": true
    }
  },
  "pdfPublishing": {
    "bleedMm": 3,
    "cropMarks": true,
    "colorProfile": "CMYK_Print",
    "highResImages": true,
    "headerFormat": "TITLE // CHAPTER",
    "pageNumberFormat": "arabic",
    "tableOfContentsStyle": "dotted"
  },
  "styleLocks": {
    "typography": true,
    "palette": true,
    "characterAppearance": true,
    "environment": true,
    "illustrationMedium": true,
    "lighting": true,
    "composition": true,
    "chapterDesign": true,
    "coverDesign": true
  }
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, profile: parsed });
  } catch (error: any) {
    console.error("Error in style-match:", error);
    res.status(500).json({ error: error.message || "Failed to extract style profile" });
  }
});

// 5. Restyle Entire Book Command
app.post("/api/gemini/style/restyle-book", async (req, res) => {
  try {
    const {
      userCommand = "Make the entire book look like a sophisticated 1960s European illustrated magazine",
      currentMasterStyle,
      bookMetadata,
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are the master Art Director & Book Designer.
The user wants to completely restyle the visual and typographic identity of the book WITHOUT regenerating or altering the underlying story text.
Translate the user's creative prompt into a complete, harmonious MasterStyleProfile JSON.`;

    const prompt = `USER RESTYLE INSTRUCTION:
"${userCommand}"

BOOK CONTEXT:
Title: "${bookMetadata?.title || 'Manuscript'}"
Genre: "${bookMetadata?.genre || 'Fiction'}"

Generate the complete new MasterStyleProfile in JSON adhering to all system fields: typographyHierarchy, colorPalette, pageDesign, artDirection, chapterDesign, lightingSystem, compositionSystem, comicVisualLanguage, coverDesign, pdfPublishing, styleLocks.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, restyledProfile: parsed });
  } catch (error: any) {
    console.error("Error in restyle-book:", error);
    res.status(500).json({ error: error.message || "Failed to restyle book" });
  }
});

// 6. Style Consistency Audit
app.post("/api/gemini/style/consistency-audit", async (req, res) => {
  try {
    const {
      masterStyle,
      book,
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const systemInstruction = `You are a forensic publishing quality control engine.
Audit the entire manuscript against the established MasterStyleProfile to identify visual drift, font anomalies, color mismatches, character trait divergence, and layout inconsistencies.
Classify each issue as ERROR, WARNING, or SUGGESTION.`;

    const prompt = `MASTER STYLE PROFILE:
${JSON.stringify(masterStyle, null, 2)}

BOOK MANUSCRIPT SKELETON:
Title: "${book?.title}"
Chapters: ${book?.chapters?.length || 0}
Characters in Bible: ${JSON.stringify(book?.memoryEngine?.level1GlobalBible?.characters || [])}

Perform an audit and output JSON:
{
  "totalIssues": 4,
  "healthScore": 92,
  "issues": [
    {
      "id": "audit-1",
      "severity": "WARNING" | "ERROR" | "SUGGESTION",
      "category": "typography" | "color" | "character" | "illustration" | "chapter_layout" | "environment",
      "title": "string (e.g. Dialogue Font Weight Discrepancy)",
      "description": "string (e.g. Chapter 2 Scene 1 contains raw sans-serif text while master style locks body to serif)",
      "affectedTarget": "string (e.g. Chapter 2 - Page 3)",
      "suggestedFix": "string (e.g. Revert paragraph to master body typography hierarchy)",
      "autoFixAction": "revert_typography"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, audit: parsed });
  } catch (error: any) {
    console.error("Error in consistency-audit:", error);
    res.status(500).json({ error: error.message || "Failed to run consistency audit" });
  }
});

// 7. Generate Back Cover Synopsis, Tagline & Author Note
app.post("/api/gemini/style/generate-back-cover", async (req, res) => {
  try {
    const {
      title,
      author,
      synopsis,
      genre,
      tone,
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();
    const prompt = `Write compelling, industry-grade back cover copy for:
Title: "${title}"
Author: "${author}"
Synopsis: "${synopsis}"
Genre: "${genre}"
Tone: "${tone || 'Atmospheric'}"

Return JSON:
{
  "tagline": "string (1 punchy line for top of back cover)",
  "synopsis": "string (2-3 paragraphs irresistible back cover blurb)",
  "authorBio": "string (1-2 sentences professional author biography)",
  "quote": "string (fictional review quote from a prestigious publication)",
  "seriesInfo": "string (e.g. Volume One of the Chronicles)",
  "isbn": "string (formatted ISBN)",
  "publisherInfo": "string (Publishing imprint and cities)"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, backCover: parsed });
  } catch (error: any) {
    console.error("Error in generate-back-cover:", error);
    res.status(500).json({ error: error.message || "Failed to generate back cover copy" });
  }
});

// ============================================================================
// REFERENCE STUDIO ENDPOINTS: GENRE-SPECIFIC CHARACTER & ART REFERENCE SYSTEM
// ============================================================================

// 1. Analyze Uploaded Visual References
app.post("/api/gemini/reference/analyze-references", async (req, res) => {
  try {
    const {
      category,
      genre = "illustrated_novel",
      referenceCount = 1,
      imageDescriptions = [],
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const prompt = `You are the Master Art Director for a published ${genre} book.
Analyze the following visual reference uploads for the "${category}" category (Count: ${referenceCount}).
Provided reference notes/descriptions:
${imageDescriptions.length ? imageDescriptions.join("\n") : "High quality artistic reference materials."}

Perform a thorough visual deconstruction across 16 core art direction criteria:
1. Medium (e.g. Oil on linen, watercolor wash, India ink, digital cell, gouache)
2. Rendering Technique (e.g. Painterly realism, flat graphic, cross-hatched, soft blended)
3. Line Quality (e.g. Suppressed soft edges, expressive dip pen, uniform vector, dry brush)
4. Brush Character (e.g. Visible bristle marks, buttery impasto, smooth airbrush)
5. Texture (e.g. Heavy watercolor tooth, linen canvas, newsprint halftones, smooth board)
6. Color Treatment & Palette (e.g. Warm amber glaze, desaturated noir, pastel luminous)
7. Contrast & Lighting (e.g. Harsh chiaroscuro, golden hour rim lights, soft ambient)
8. Degree of Realism (0-100%) vs Degree of Stylization (0-100%)
9. Facial Rendering (e.g. Sculptural bone structure, caricatured emotional nuance, iconic silhouette)
10. Background Treatment (e.g. Painterly suggestion, detailed perspective architectural grid, bokeh blur)
11. Visual Density (e.g. Spacious with generous negative space, dense kinetic storytelling)
12. Perspective & Camera (e.g. Cinematic eye-level, dynamic low-angle hero shots)
13. Mood & Atmosphere (e.g. Introspective literary, electrifying heroic, tense noir)
14. Master Prompt Summary Profile (Single evocative prompt paragraph for image generators)

Return JSON with this exact schema:
{
  "medium": "string",
  "renderingTechnique": "string",
  "lineQuality": "string",
  "brushCharacter": "string",
  "texture": "string",
  "colorTreatment": "string",
  "contrast": "string",
  "lighting": "string",
  "compositionRules": "string",
  "realismPercent": 70,
  "stylizationPercent": 30,
  "facialRendering": "string",
  "backgroundTreatment": "string",
  "visualDensity": "string",
  "perspective": "string",
  "mood": "string",
  "summaryPromptProfile": "string (e.g. 'Painterly editorial illustration with visible rough brushwork, simplified but anatomically credible figures, luminous pastel palette, soft environmental backgrounds, expressive faces, subtle paper texture and moderately exaggerated proportions.')",
  "extractedPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, profile: parsed });
  } catch (error: any) {
    console.error("Error in analyze-references:", error);
    res.status(500).json({ error: error.message || "Failed to analyze references" });
  }
});

// 2. Create Structured Character Set from Reference Materials
app.post("/api/gemini/reference/create-character-set", async (req, res) => {
  try {
    const {
      genre = "illustrated_novel",
      existingCharacters = [],
      referenceDescriptions = [],
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const prompt = `You are a character designer and continuity supervisor for a ${genre} publication.
Identify, organize, or refine recurring characters from the provided visual reference materials and notes:
Notes/Context:
${referenceDescriptions.join("\n") || "Character sheets, turnarounds, expressions, and costume references."}
Existing characters:
${JSON.stringify(existingCharacters)}

For each character, generate a complete Character Card with genre-tailored visual DNA:
- Name
- Role
- Visual identifier (instant visual recognition hook)
- Approximate age
- Face characteristics (bone structure, eyes, nose, skin)
- Hair (color, length, texture, style)
- Body proportions (height, build, posture, silhouette)
- Clothing (standard attire, fabrics, layers)
- Accessories (signature items, weapons, jewelry, props)
- Color associations (2-4 hex codes)
- Typical expressions (3 key emotional states)
- Typical poses (3 signature physical gestures)
- Distinguishing features (scars, birthmarks, signature quirks)
- Suggested locked traits (face, hair, bodyProportions, costume, colorPalette, accessories, overallIdentity)

Return JSON:
{
  "characters": [
    {
      "name": "string",
      "role": "string",
      "visualIdentifier": "string",
      "approximateAge": "string",
      "faceCharacteristics": "string",
      "hair": "string",
      "bodyProportions": "string",
      "clothing": "string",
      "accessories": "string",
      "colorAssociations": ["#hex1", "#hex2", "#hex3"],
      "typicalExpressions": ["string", "string", "string"],
      "typicalPoses": ["string", "string", "string"],
      "distinguishingFeatures": "string",
      "locks": {
        "face": true,
        "hair": true,
        "bodyProportions": true,
        "costume": true,
        "colorPalette": true,
        "accessories": true,
        "overallIdentity": true
      }
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, characters: parsed.characters || [] });
  } catch (error: any) {
    console.error("Error in create-character-set:", error);
    res.status(500).json({ error: error.message || "Failed to create character set" });
  }
});

// 3. Style Mixer: Combine Multiple Assigned References into Master Art Direction Profile
app.post("/api/gemini/reference/style-mixer", async (req, res) => {
  try {
    const {
      genre = "illustrated_novel",
      lineworkStyle = "",
      colorPaletteStyle = "",
      characterRenderingStyle = "",
      backgroundStyle = "",
      lightingStyle = "",
      textureStyle = "",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const prompt = `You are the Master Art Director for a ${genre} book project.
Combine and harmonize distinct visual reference sources into a unified, coherent Master Art Direction Profile:
- Linework Reference: "${lineworkStyle || "Crisp tapered contours"}"
- Color Palette Reference: "${colorPaletteStyle || "Harmonious warm earth tones"}"
- Character Rendering Reference: "${characterRenderingStyle || "Naturalistic anatomy with emotional nuance"}"
- Background Treatment Reference: "${backgroundStyle || "Atmospheric painterly suggestion with spatial depth"}"
- Lighting Reference: "${lightingStyle || "Warm directional chiaroscuro"}"
- Texture Reference: "${textureStyle || "Textured heavy watercolor paper"}"

Translate these into unified, compatible visual attributes (do not simply copy any one reference; synthesize them into a cohesive whole).

Return JSON:
{
  "medium": "string",
  "renderingTechnique": "string",
  "lineQuality": "string",
  "brushCharacter": "string",
  "texture": "string",
  "colorTreatment": "string",
  "contrast": "string",
  "lighting": "string",
  "compositionRules": "string",
  "realismPercent": 70,
  "stylizationPercent": 30,
  "facialRendering": "string",
  "backgroundTreatment": "string",
  "visualDensity": "string",
  "perspective": "string",
  "mood": "string",
  "summaryPromptProfile": "string",
  "harmonyNotes": "string (explanation of how the styles were harmonized)"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, masterProfile: parsed });
  } catch (error: any) {
    console.error("Error in style-mixer:", error);
    res.status(500).json({ error: error.message || "Failed to mix styles" });
  }
});

// 4. Quick Visual Setup: Build Complete Visual Bible in One Click
app.post("/api/gemini/reference/build-visual-bible", async (req, res) => {
  try {
    const {
      genre = "illustrated_novel",
      bookTitle = "Untitled Book",
      characterNotes = "",
      artStyleNotes = "",
      paletteNotes = "",
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const prompt = `Build a complete, professional Visual Bible for the book "${bookTitle}" (Genre: ${genre}).
Inputs:
- Character References: "${characterNotes || "Main protagonist and supporting cast"}"
- Art Style References: "${artStyleNotes || "High craft publication illustration"}"
- Palette References: "${paletteNotes || "Harmonious atmospheric tones"}"

Create an interconnected visual system containing:
1. Master Character Bible (2-3 fully realized characters with distinct visual identifiers and locked traits)
2. Master Art Bible (Comprehensive medium, brushwork, line, texture, lighting, realism/stylization breakdown)
3. Palette (5 curated hex colors with role definitions)
4. Lighting System (Key light, ambient fill, and mood rules)
5. Composition Rules (Framing, camera angles, negative space)
6. Illustration Prompt Framework (Reusable formula for book illustrations)

Return JSON:
{
  "characters": [
    {
      "name": "string",
      "role": "string",
      "visualIdentifier": "string",
      "approximateAge": "string",
      "faceCharacteristics": "string",
      "hair": "string",
      "bodyProportions": "string",
      "clothing": "string",
      "accessories": "string",
      "colorAssociations": ["#hex1", "#hex2"],
      "typicalExpressions": ["string", "string"],
      "typicalPoses": ["string", "string"],
      "distinguishingFeatures": "string",
      "locks": {
        "face": true,
        "hair": true,
        "bodyProportions": true,
        "costume": true,
        "colorPalette": true,
        "accessories": true,
        "overallIdentity": true
      }
    }
  ],
  "masterArtBible": {
    "medium": "string",
    "renderingTechnique": "string",
    "lineQuality": "string",
    "brushCharacter": "string",
    "texture": "string",
    "colorTreatment": "string",
    "contrast": "string",
    "lighting": "string",
    "compositionRules": "string",
    "realismPercent": 70,
    "stylizationPercent": 30,
    "facialRendering": "string",
    "backgroundTreatment": "string",
    "visualDensity": "string",
    "perspective": "string",
    "mood": "string",
    "summaryPromptProfile": "string",
    "isLocked": true
  },
  "palette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
  "lightingRules": "string",
  "compositionRules": "string",
  "promptFramework": "string"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, visualBible: parsed });
  } catch (error: any) {
    console.error("Error in build-visual-bible:", error);
    res.status(500).json({ error: error.message || "Failed to build visual bible" });
  }
});

// 5. Check Visual Consistency Audit
app.post("/api/gemini/reference/audit-consistency", async (req, res) => {
  try {
    const {
      genre = "illustrated_novel",
      characters = [],
      masterArtBible,
      sampleScenes = [],
      model = "gemini-3.7-flash"
    } = req.body;

    const ai = getAiClient();

    const prompt = `You are the Lead Visual Quality Inspector and Art Director for a 220-page ${genre} publication.
Audit the illustrations and scenes across the book against the established Master Reference System:

MASTER CHARACTER BIBLE:
${JSON.stringify(characters)}

MASTER ART BIBLE:
${JSON.stringify(masterArtBible)}

BOOK SCENES & ILLUSTRATIONS TO AUDIT:
${JSON.stringify(sampleScenes)}

Audit 11 key consistency dimensions:
1. Character Face
2. Hair
3. Clothing & Costume Continuity
4. Body Proportions
5. Color Palette
6. Art Medium
7. Line Quality
8. Lighting Consistency
9. Environment / World Authenticity
10. Visual Density
11. Chapter Style Alignment

For each scene or illustration evaluated, assign one of four statuses:
- "CONSISTENT"
- "MINOR_DRIFT"
- "SIGNIFICANT_DRIFT"
- "MAJOR_ERROR"

And provide one of four quick correction actions:
- "REGENERATE"
- "CORRECT_CHARACTER"
- "CORRECT_STYLE"
- "CORRECT_COLOR"

Return JSON:
{
  "overallStatus": "CONSISTENT" | "MINOR_DRIFT" | "SIGNIFICANT_DRIFT" | "MAJOR_ERROR",
  "score": 92,
  "evaluatedCount": 5,
  "items": [
    {
      "targetTitle": "string (e.g. Chapter 1 - Scene 1 Illustration)",
      "chapterNumber": 1,
      "pageNumber": 2,
      "status": "CONSISTENT" | "MINOR_DRIFT" | "SIGNIFICANT_DRIFT" | "MAJOR_ERROR",
      "driftCategory": "character_face" | "hair" | "clothing" | "body_proportions" | "color_palette" | "art_medium" | "line_quality" | "lighting" | "environment" | "visual_density" | "chapter_style",
      "issueDescription": "string",
      "suggestedAction": "REGENERATE" | "CORRECT_CHARACTER" | "CORRECT_STYLE" | "CORRECT_COLOR"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      report: {
        timestamp: new Date().toISOString(),
        overallStatus: parsed.overallStatus || "CONSISTENT",
        score: parsed.score ?? 95,
        evaluatedCount: parsed.evaluatedCount || (parsed.items ? parsed.items.length : 1),
        items: parsed.items || []
      }
    });
  } catch (error: any) {
    console.error("Error in audit-consistency:", error);
    res.status(500).json({ error: error.message || "Failed to audit visual consistency" });
  }
});



// Helper for high-quality SVG illustration fallback
function generateArtisticFallbackSvg(prompt: string, style: string, palette: string[]) {
  const c1 = palette[0] || "#1e293b";
  const c2 = palette[1] || "#d97706";
  const c3 = palette[2] || "#f8fafc";
  const c4 = palette[3] || "#0284c7";
  const safePrompt = prompt.replace(/"/g, "'").slice(0, 75);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="50%" stop-color="${c4}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${c2}" stop-opacity="0.9" />
    </linearGradient>
    <filter id="grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"/>
      <feComposite in2="SourceGraphic" in="glaze" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#skyGrad)"/>
  <circle cx="620" cy="180" r="110" fill="${c3}" fill-opacity="0.25" />
  <circle cx="620" cy="180" r="80" fill="${c2}" fill-opacity="0.4" />
  
  <!-- Atmospheric silhouette layers -->
  <path d="M0 450 Q 200 320 400 420 T 800 380 L 800 600 L 0 600 Z" fill="${c1}" fill-opacity="0.75" />
  <path d="M0 490 Q 250 400 500 480 T 800 440 L 800 600 L 0 600 Z" fill="${c1}" fill-opacity="0.95" />
  
  <!-- Architectural / Graphic ink lines -->
  <line x1="80" y1="120" x2="80" y2="480" stroke="${c3}" stroke-width="2" stroke-opacity="0.4" stroke-dasharray="4 8"/>
  <line x1="720" y1="120" x2="720" y2="480" stroke="${c3}" stroke-width="2" stroke-opacity="0.4" stroke-dasharray="4 8"/>
  
  <!-- Art frame -->
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="${c3}" stroke-width="1.5" stroke-opacity="0.4"/>
  
  <!-- Caption vignette -->
  <rect x="70" y="480" width="660" height="60" rx="6" fill="#09090b" fill-opacity="0.85" stroke="${c2}" stroke-width="1" stroke-opacity="0.6"/>
  <text x="400" y="515" fill="${c3}" font-family="Georgia, serif" font-size="16" font-style="italic" text-anchor="middle">
    "${safePrompt}..."
  </text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 7. Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StoryForge Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
