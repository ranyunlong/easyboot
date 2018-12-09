import * as uuid from 'uuid'
export class Uidservices {
    public create() {
        return uuid()
    }
}