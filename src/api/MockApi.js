import axios from 'axios'

export const getLOLRevisions = () => {
    return axios.get('/mock/revisions')
}

export const getEquipments = () => {
    return axios.get('/mock/equipments')
}