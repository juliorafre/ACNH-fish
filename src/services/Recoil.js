import { atom } from 'jotai'
// Utils
import { HEMISPHERES, FILTERS_FUNC } from '../utils'

const hemisphere = atom(HEMISPHERES.South);

const filters = atom(FILTERS_FUNC.now);

export {
  hemisphere,
  filters
}

