// 示例简历数据：遵循 STAR 法则与 ATS 友好规范，含教育明细与量化成果
// 用于一键填充预览，演示四套模板的完整效果
export const SAMPLE_RESUME = {
  basic: { name: '林晓宇', phone: '138-1234-5678', email: 'linxiaoyu@example.com', city: '北京' },
  intent: { position: '前端开发工程师', salary: '15-20K', start: '一周内' },
  education: [
    {
      school: '北京理工大学',
      major: '计算机科学与技术',
      degree: '本科',
      period: '2022.09 - 2026.06',
      courses: '数据结构、操作系统、计算机网络、数据库原理',
      gpa: '3.7 / 4.0',
      honors: '校级一等奖学金 · 优秀毕业生'
    }
  ],
  experiences: [
    {
      org: '字节跳动',
      role: '前端开发实习生',
      time: '2024.07 - 至今',
      desc: '负责核心业务前端开发，完成三个模块重构，首屏加载时间降低 35%；推动公共组件库落地，团队开发效率提升 30%。'
    },
    {
      org: '校园二手交易小程序',
      role: '队长 / 全栈开发',
      time: '2023.06 - 2023.12',
      desc: '带队完成校园二手交易小程序，DAU 峰值达 1200，获校级一等奖；负责 Vue 前端与微信小程序端开发。'
    }
  ],
  skills: ['Vue3', 'React', 'TypeScript', 'JavaScript', 'Git', 'Vite'],
  languages: ['英语 CET-6', '普通话 二级甲等'],
  summary: '计算机专业应届生，具备 1 年互联网前端开发经验，熟悉 Vue / React 技术栈，注重代码质量与用户体验。拥有可量化的项目成果，期待加入一流团队持续成长。'
}
