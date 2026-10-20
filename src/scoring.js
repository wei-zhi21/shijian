import { lang } from './i18n'

// 简历评分引擎：基于“什么是好简历”（完整性 + STAR 法则 + ATS 关键词）
// 满分 100，返回分数与优化建议（中英随语言切换）
export function evaluateResume(data) {
  const zh = lang.value !== 'en'
  const tips = []
  let score = 0
  const add = (n, tip) => {
    score += n
    if (tip) tips.push(tip)
  }

  // 基本信息 15
  const b = data.basic
  let basic = 0
  if (b.name) basic += 5
  else tips.push(zh ? '请填写姓名' : 'Please fill in your name')
  if (b.phone && /^\d{6,}/.test(b.phone)) basic += 5
  else tips.push(zh ? '请填写有效的联系电话' : 'Please enter a valid phone number')
  if (b.email && b.email.includes('@')) basic += 5
  else tips.push(zh ? '请填写有效的邮箱地址' : 'Please enter a valid email')
  add(Math.min(basic, 15))

  // 求职意向 10
  if (data.intent.position) add(10)
  else tips.push(zh ? '请填写目标岗位，让招聘方快速了解你的定位' : 'Add your target role so recruiters understand your focus')

  // 教育经历 15
  const eduFilled = data.education.filter((e) => e.school && e.major).length
  add(Math.min(eduFilled * 12, 15))
  if (!eduFilled) tips.push(zh ? '请完善教育经历（学校与专业）' : 'Complete your education (school & major)')

  // 工作/项目经历 25
  const expFilled = data.experiences.filter((e) => e.org || e.desc).length
  add(Math.min(expFilled * 12, 25))
  if (!expFilled) tips.push(zh ? '请填写工作/项目经历，这是简历含金量的核心' : 'Add work/project experience - the core value of a resume')

  // STAR 法则质量 +5
  const hasSTAR = data.experiences.some((e) => {
    const d = e.desc || ''
    return /情境|任务|行动|结果|负责|完成|提升|Situation|Task|Action|Result/.test(d)
  })
  if (hasSTAR) add(5)
  else tips.push(zh ? '经历描述建议使用 STAR 法则（情境-任务-行动-结果），更有说服力' : 'Use the STAR format (Situation-Task-Action-Result) for more compelling descriptions')

  // 专业技能 15
  add(Math.min(data.skills.length * 3, 15))
  if (!data.skills.length) tips.push(zh ? '请添加专业技能（建议 3-6 项）' : 'Add skills (3-6 recommended)')

  // ATS 关键词 +5
  const kw = ['vue', 'react', '前端', '开发', 'java', 'python', '项目', '团队', '管理', 'git', 'typescript', 'javascript', 'node']
  const text = (data.summary + data.experiences.map((e) => e.desc).join(' ')).toLowerCase()
  const hit = kw.filter((k) => text.includes(k)).length
  add(Math.min(hit, 5))
  if (hit < 3) tips.push(zh ? '适当加入岗位相关关键词（技术栈/职责）以提升 ATS 系统通过率' : 'Add role-related keywords (tech stack/duties) to pass ATS screening')

  // 语言能力 5
  add(Math.min(data.languages.length * 2.5, 5))

  // 自我评价 10
  if (data.summary && data.summary.length >= 20) add(10)
  else tips.push(zh ? '自我评价建议 20 字以上，突出核心优势与求职意愿' : 'Write a 20+ character summary highlighting your strengths')

  return {
    score: Math.round(Math.min(score, 100)),
    tips
  }
}
