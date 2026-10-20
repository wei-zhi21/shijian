import { computed } from 'vue'

// 三套模板共用的简历派生字段
export function useResumeFields(props) {
  const name = computed(() => props.resume.basic.name || '未填写')
  const title = computed(() => props.resume.intent.position || '求职意向未填写')
  const avatar = computed(() => (props.resume.basic.name || '未').slice(0, 1))
  const educationText = computed(() => {
    return props.resume.education
      .map((e) => [e.school, e.major, e.degree].filter(Boolean).join(' · ') + (e.period ? ' ' + e.period : ''))
      .filter(Boolean)
      .join('；') || '教育经历未填写'
  })
  return { name, title, avatar, educationText }
}
