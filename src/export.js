import { resume } from './resume'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

// 将简历数据序列化为 Markdown
export function toMarkdown(data = resume) {
  const lines = []
  lines.push(`# ${data.basic.name || '未填写'}`)
  const head = [data.intent.position, data.basic.city].filter(Boolean).join(' · ')
  if (head) lines.push(`**${head}**`)
  const contact = [data.basic.phone, data.basic.email].filter(Boolean).join(' | ')
  if (contact) lines.push(`联系方式：${contact}`)
  lines.push('')

  lines.push('## 教育背景')
  data.education.forEach((e) => {
    const parts = [e.school, e.major, e.degree].filter(Boolean).join(' · ')
    if (parts) lines.push(`- ${parts}${e.period ? `（${e.period}）` : ''}`)
  })
  lines.push('')

  lines.push('## 工作 / 项目经历')
  data.experiences.forEach((e) => {
    if (e.org || e.role) {
      lines.push(`### ${e.org || ''}${e.role ? ' · ' + e.role : ''}${e.time ? `　[${e.time}]` : ''}`)
    }
    if (e.desc) lines.push(e.desc)
    lines.push('')
  })

  if (data.skills.length) {
    lines.push('## 专业技能')
    lines.push(data.skills.join('、'))
    lines.push('')
  }
  if (data.languages.length) {
    lines.push('## 语言能力')
    data.languages.forEach((l) => lines.push(`- ${l}`))
    lines.push('')
  }
  if (data.summary) {
    lines.push('## 自我评价')
    lines.push(data.summary)
  }
  return lines.join('\n')
}

// 触发下载 .md 文件
export function downloadMarkdown() {
  const md = toMarkdown()
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${resume.basic.name || '简历'}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 触发下载 .pdf 文件（渲染预览区为图片再入 PDF，保证中文版式）
export async function downloadPDF() {
  const el = document.getElementById('resume-pdf')
  if (!el) return
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false
  })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pdfWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pdfHeight
  while (heightLeft > 0) {
    position -= pdfHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight
  }
  pdf.save(`${resume.basic.name || '简历'}.pdf`)
}
