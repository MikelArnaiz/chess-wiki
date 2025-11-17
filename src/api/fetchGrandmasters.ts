import { createFailureStatus, createSuccessStatus } from '../utils/Status'
import { GRANDMASTERS_API } from './endpoints'

export type GrandmastersResponse = { players: string[] }

export async function fetchGrandmastersList() {
  try {
    const response = await fetch(GRANDMASTERS_API)

    if (!response.ok) {
      throw new Error('Fetching grandmasters API failed')
    }

    const result = (await response.json()) as GrandmastersResponse
    return createSuccessStatus(result.players)
  } catch {
    return createFailureStatus()
  }
}
