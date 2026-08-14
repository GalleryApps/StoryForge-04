import JSZip from 'jszip';
import { BookDocument } from '../types';
import { sanitizeFilename } from './pdfGenerator';

/**
 * Generate a standard EPUB container file
 */
export async function generateEpub(book: BookDocument): Promise<{ blob: Blob; filename: string }> {
  const zip = new JSZip();

  // 1. mimetype (must be uncompressed first file in EPUB)
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  // 2. META-INF/container.xml
  zip.folder('META-INF')?.file('container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

  const oebps = zip.folder('OEBPS');

  // 3. CSS
  oebps?.file('stylesheet.css', `
body { font-family: serif; line-height: 1.6; margin: 5%; color: #111; }
h1 { font-size: 2em; text-align: center; margin-top: 1.5em; margin-bottom: 0.5em; text-transform: uppercase; }
h2 { font-size: 1.4em; text-align: center; color: #444; margin-bottom: 1em; }
p { text-indent: 1.5em; margin: 0; padding: 0.2em 0; text-align: justify; }
.dialogue { text-indent: 1.5em; margin: 0.2em 0; }
.illustration { text-align: center; margin: 1.5em 0; }
.caption { font-style: italic; font-size: 0.9em; color: #666; text-align: center; margin-top: 0.5em; }
.callout { background: #f4f6f8; border-left: 4px solid #0284c7; padding: 1em; margin: 1.5em 0; }
.scene-break { text-align: center; margin: 1.5em 0; color: #888; }
`);

  // 4. Content chapters
  const spineItems: string[] = [];
  const manifestItems: string[] = [
    '<item id="css" href="stylesheet.css" media-type="text/css"/>',
    '<item id="toc" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav"/>'
  ];

  let chapterIdx = 1;
  for (const chapter of book.chapters) {
    const filename = `chapter_${chapter.number}.xhtml`;
    const itemId = `chapter_${chapter.number}`;
    spineItems.push(`<itemref idref="${itemId}"/>`);
    manifestItems.push(`<item id="${itemId}" href="${filename}" media-type="application/xhtml+xml"/>`);

    let chapterHtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>${chapter.title}</title>
  <link rel="stylesheet" type="text/css" href="stylesheet.css"/>
</head>
<body>
  <h1>Chapter ${chapter.number}</h1>
  <h2>${chapter.title}</h2>
`;

    for (const scene of chapter.scenes) {
      for (const page of scene.pages) {
        for (const el of page.elements) {
          if (el.type === 'heading') {
            chapterHtml += `  <h3>${el.content}</h3>\n`;
          } else if (el.type === 'paragraph') {
            chapterHtml += `  <p>${el.content}</p>\n`;
          } else if (el.type === 'dialogue') {
            const spk = el.speaker ? `<strong>${el.speaker}:</strong> ` : '';
            chapterHtml += `  <p class="dialogue">${spk}"${el.content}"</p>\n`;
          } else if (el.type === 'exercise_box' || el.calloutType) {
            chapterHtml += `  <div class="callout"><h4>${el.calloutType?.toUpperCase() || 'EXERCISE'}</h4><p>${el.content}</p></div>\n`;
          } else if (el.type === 'scene_break') {
            chapterHtml += `  <div class="scene-break">* * *</div>\n`;
          }
        }
      }
    }

    chapterHtml += `</body>\n</html>`;
    oebps?.file(filename, chapterHtml);
    chapterIdx++;
  }

  // 5. Navigation toc.xhtml
  const tocNavHtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Table of Contents</title>
  <link rel="stylesheet" type="text/css" href="stylesheet.css"/>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Table of Contents</h1>
    <ol>
      ${book.chapters.map(c => `<li><a href="chapter_${c.number}.xhtml">Chapter ${c.number}: ${c.title}</a></li>`).join('\n      ')}
    </ol>
  </nav>
</body>
</html>`;
  oebps?.file('toc.xhtml', tocNavHtml);

  // 6. content.opf
  const opfContent = `<?xml version="1.0" encoding="utf-8"?>
<package version="3.0" unique-identifier="pub-id" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:${book.id}</dc:identifier>
    <dc:title>${book.title}</dc:title>
    <dc:creator>${book.author}</dc:creator>
    <dc:language>en</dc:language>
    <dc:publisher>${book.frontMatter.publisherName || 'StoryForge Press'}</dc:publisher>
    <meta property="dcterms:modified">${new Date().toISOString().replace(/\.[0-9]+Z$/, 'Z')}</meta>
  </metadata>
  <manifest>
    ${manifestItems.join('\n    ')}
  </manifest>
  <spine>
    ${spineItems.join('\n    ')}
  </spine>
</package>`;
  oebps?.file('content.opf', opfContent);

  const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
  const filename = `${sanitizeFilename(`${book.author}_${book.title}_Volume${book.volume || 1}`)}.epub`;

  return { blob, filename };
}

/**
 * Generate Clean Markdown Document
 */
export function generateMarkdown(book: BookDocument): { content: string; filename: string } {
  let md = `# ${book.title}\n`;
  if (book.subtitle) md += `### *${book.subtitle}*\n`;
  md += `**By ${book.author}** | Volume ${book.volume || 1}\n\n`;
  md += `*Genre: ${book.genre} | Format: ${book.bookType}*\n\n---\n\n`;

  if (book.frontMatter.dedication) {
    md += `*Dedication: ${book.frontMatter.dedication}*\n\n---\n\n`;
  }

  for (const chapter of book.chapters) {
    md += `\n# Chapter ${chapter.number}: ${chapter.title}\n\n`;
    if (chapter.summary) md += `> *Chapter Summary: ${chapter.summary}*\n\n`;

    for (const scene of chapter.scenes) {
      if (scene.title) md += `### Scene: ${scene.title} (${scene.location})\n\n`;
      for (const page of scene.pages) {
        for (const el of page.elements) {
          if (el.type === 'heading') {
            md += `#### ${el.content}\n\n`;
          } else if (el.type === 'paragraph') {
            md += `${el.content}\n\n`;
          } else if (el.type === 'dialogue') {
            md += `> **${el.speaker || 'SPEAKER'}**: "${el.content}"\n\n`;
          } else if (el.type === 'illustration') {
            md += `![Illustration: ${el.content || el.imagePrompt}](${el.imageUrl || 'placeholder.jpg'})\n*${el.content || el.imagePrompt}*\n\n`;
          } else if (el.type === 'exercise_box' || el.calloutType) {
            md += `> **[${el.calloutType?.toUpperCase() || 'EXERCISE'}]**:\n> ${el.content}\n\n`;
          } else if (el.type === 'scene_break') {
            md += `\n* * *\n\n`;
          }
        }
      }
    }
  }

  if (book.endMatter.aboutAuthor) {
    md += `\n---\n\n## About the Author\n\n${book.endMatter.aboutAuthor}\n`;
  }

  const filename = `${sanitizeFilename(`${book.author}_${book.title}_Volume${book.volume || 1}`)}.md`;
  return { content: md, filename };
}

/**
 * Generate Plain Text Document
 */
export function generatePlainText(book: BookDocument): { content: string; filename: string } {
  let txt = `================================================================================\n`;
  txt += `  ${book.title.toUpperCase()}\n`;
  if (book.subtitle) txt += `  ${book.subtitle}\n`;
  txt += `  by ${book.author} (Volume ${book.volume || 1})\n`;
  txt += `================================================================================\n\n`;

  for (const ch of book.chapters) {
    txt += `\n--------------------------------------------------------------------------------\n`;
    txt += `CHAPTER ${ch.number}: ${ch.title.toUpperCase()}\n`;
    txt += `--------------------------------------------------------------------------------\n\n`;

    for (const sc of ch.scenes) {
      for (const pg of sc.pages) {
        for (const el of pg.elements) {
          if (el.type === 'heading') {
            txt += `\n[ ${el.content.toUpperCase()} ]\n\n`;
          } else if (el.type === 'paragraph') {
            txt += `    ${el.content}\n\n`;
          } else if (el.type === 'dialogue') {
            txt += `    ${el.speaker ? `${el.speaker.toUpperCase()}: ` : ''}"${el.content}"\n\n`;
          } else if (el.type === 'exercise_box' || el.calloutType) {
            txt += `    >>> [${el.calloutType?.toUpperCase() || 'EXERCISE'}]: ${el.content}\n\n`;
          } else if (el.type === 'scene_break') {
            txt += `\n    *  *  *\n\n`;
          }
        }
      }
    }
  }

  const filename = `${sanitizeFilename(`${book.author}_${book.title}_Volume${book.volume || 1}`)}.txt`;
  return { content: txt, filename };
}
