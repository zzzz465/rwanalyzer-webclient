interface ProfileLog {
    label: string
    key: string
}

export interface Type {

}

export interface Def {

}

export interface MethodBase {

}

/** parse serialized json string to ProfileLog objects */
function parseString (data: string): ProfileLog[] {
    const raw = JSON.parse(data)
    const result: ProfileLog[] = []
    for (const obj of raw) {
        result.push(obj)
    }

    return result
}