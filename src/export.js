import { resume } from './resume'

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
