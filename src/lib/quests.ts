import { format, parseISO } from 'date-fns'

// Types
interface TimeSlot {
  id: string
  time: string
  price: number
}

export interface QuestWithSlots {
  name: string
  description: string
  timeSlots: TimeSlot[]
}

interface Quest {
    id: string;
    slug: string;
    name: string;
    quote: string;
    statistics: {
        playersAllTime: number,
        length: number,
        players: string;
        type: "horror" | "drinking" | "quest",
        difficulty: 1 | 2 | 3
        rating: {
            value: string,
            overall: number
        }
    },
    lore: string;
    requirements: string[]
    timelines: {
        days: string[],
        timegroups: {
            times: string[],
            price: number
        }[]
    }[]
}

const testQuests: Quest[] = [
    {
        id: '1',
        slug: 'test',
        name: "Dragon Slayer",
        description: "Embark on a journey to defeat the mighty dragon.",
        timelines: [
            {
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                timegroups: [
                    {
                        times: ["11:00", "16:00"],
                        price: 100
                    },
                    {
                        times: ["20:00"],
                        price: 150
                    }
                ]
            },
            {
                days: ["Saturday", "Sunday"],
                timegroups: [
                    {
                        times: ["12:00", "17:00"],
                        price: 200
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        slug: 'uwu',
        name: "Dragon Slayer aaa",
        description: "Embark on a journey to defeat the mighty dragon.",
        timelines: [
            {
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                timegroups: [
                    {
                        times: ["11:00", "16:00"],
                        price: 100
                    },
                    {
                        times: ["20:00"],
                        price: 150
                    }
                ]
            },
            {
                days: ["Saturday", "Sunday"],
                timegroups: [
                    {
                        times: ["12:00", "17:00"],
                        price: 200
                    }
                ]
            }
        ]
    }
];

export default testQuests;

function getTimeSlotsForDay(quest: Quest, dayOfWeek: string): Promise<TimeSlot[]> {
    const matchingTimeline = quest.timelines.find(timeline =>
      timeline.days.includes(dayOfWeek)
    )

    if (!matchingTimeline) return Promise.resolve([])

    return Promise.resolve(
      matchingTimeline.timegroups.flatMap(group =>
        group.times.map(time => ({
          id: `${time}-${group.price}`,
          time,
          price: group.price
        }))
      )
    )
  }

// Main API Functions
export async function getQuests() {
  return testQuests
}

export async function getQuest(slug: string) {
    return testQuests.find(quest => quest.slug === slug)
  }

export async function getQuestsForDate(date: string): Promise<QuestWithSlots[]> {
  const dayOfWeek = format(parseISO(date), 'eeee')

  const questsWithSlots = await Promise.all(
    testQuests.map(async (quest) => {
      const timeSlots = await getTimeSlotsForDay(quest, dayOfWeek)
      if (timeSlots.length === 0) return null

      return {
        name: quest.name,
        description: quest.description,
        timeSlots,
      }
    })
  )

  return questsWithSlots.filter((quest): quest is QuestWithSlots => quest !== null)
}
