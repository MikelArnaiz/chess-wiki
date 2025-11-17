import { GRANDMASTERS_API } from './endpoints'

export async function fetchGrandmasters() {
  try {
    const response = await fetch(GRANDMASTERS_API)

    if (!response.ok) {
      throw new Error('Fetching grandmasters API failed')
    }

    const result = await response.json()
    return result as { players: string[] }
  } catch {
    return null
  }
}
