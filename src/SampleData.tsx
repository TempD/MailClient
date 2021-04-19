import { add } from 'date-fns'
import { set } from 'date-fns/esm'

export interface EmailRecord {
  from: string
  to: string[]
  subject: string
  attachments: boolean
  date: Date
  body: string
}

export interface SampleEmailData {
  data: EmailRecord[]
}

const SampleData: SampleEmailData = {
  data: [
    {
      from: 'aaa@example.com',
      to: ['zzz.zzz@example.com'],
      subject: '[ HR-888 ] Notice of official announcement',
      attachments: false,
      date: set(new Date(), { hours: 0, minutes: 20 }),
      body: 'Email 1: The company has been purchased!'
    },
    {
      from: 'bbb.bbbbbb@example.com',
      to: ['yyy@example.com'],
      subject: '[web:333] "Web Contact"',
      attachments: false,
      date: set(new Date(), { hours: 0, minutes: 10 }),
      body: 'Email 2: I am your new web contact'
    },
    {
      from: 'ccc@example.com',
      to: ['xxx@example.com', 'foo@example.com'],
      subject: 'Happy New Year! Greetings for the New Year.',
      attachments: true,
      date: set(new Date(), { hours: 0, minutes: 0 }),
      body: 'Email 3: Happy new year! 謹賀新年!'
    },
    {
      from: 'ddd.ddddd@example.com',
      to: ['vvv.vvvvv@example.com', 'xxx@example.com'],
      subject: '[HR-887(Revised: Office Expansion Project Team)] Notice of office expansion',
      attachments: false,
      date: add(new Date(2021, 2, 1), { hours: 0, minutes: 10 }),
      body: 'Email 5: Our office is expanding!'
    },
    {
      from: 'eee@example.com',
      to: ['sss@example.com', 'vvv.vvvvv@example.com', 'xxx@example.com'],
      subject: '[Github] Logout page',
      attachments: false,
      date: add(new Date(2021, 2, 1), { hours: 0, minutes: 9 }),
      body: 'Email 6: Instructions for logging out of github'
    },
    {
      from: 'fff.ffffff@example.com',
      to: ['sss@example.com'],
      subject: '[dev]Postfix 3.1.12 / 3.2.9 / 3.3.4 / 3.4.5',
      attachments: false,
      date: add(new Date(2021, 2, 1), { hours: 0, minutes: 8 }),
      body: 'Email 7: Please see attached for Postfix'
    },
    {
      from: 'ggg@example.com',
      to: ['ppp@example.com'],
      subject: 'Re: [Github] Brush-up on loading animation',
      attachments: false,
      date: add(new Date(2021, 0, 1), { hours: 0, minutes: 7 }),
      body: 'Email 8: Hope the brush-up looks good!'
    },
    {
      from: 'hhh.hhhhhhhh@example.com',
      to: ['ooo.ooo@example.com'],
      subject: 'Workplace Summary for sample, Inc.: Jun 2 - Jun 9',
      attachments: true,
      date: add(new Date(2021, 0, 1), { hours: 0, minutes: 6 }),
      body: 'Email 9: The workplace if fun!'
    },
    {
      from: 'alice@example.com',
      to: ['bob@example.com'],
      subject: '大好き😘',
      attachments: true,
      date: add(new Date(2019, 11, 31), { hours: 0, minutes: 10 }),
      body: 'Email 10: No man in the middle!'
    },
    {
      from: 'tempd@github.com',
      to: ['hello@github.com'],
      subject: 'I hope this suits your needs',
      attachments: true,
      date: add(new Date(2019, 11, 31), { hours: 3, minutes: 30 }),
      body: 'Email 11: Having fun building!'
    },
    {
      from: 'tempd@github.com',
      to: ['hello@github.com'],
      subject: 'Let\'s add another record to show fitering',
      attachments: true,
      date: new Date(2018, 11, 31),
      body: 'Email 12: "Are you not entertained?!" -Russell Crowe'
    }
  ]
}

export default SampleData
