interface UserProps {
    id: number
    name: string
    email: string
    roles: string[]
    isEnabled: boolean
    lastLoggedIn: string
    modifiedAt: string
    createdAt: string
}

export class AuthUser implements UserProps {
    id: number
    name: string
    email: string
    roles: string[]
    isEnabled: boolean
    lastLoggedIn: string
    modifiedAt: string
    createdAt: string

    constructor(props: UserProps) {
        this.id = props.id
        this.name = props.name
        this.email = props.email
        this.roles = props.roles
        this.isEnabled = props.isEnabled
        this.lastLoggedIn = props.lastLoggedIn
        this.modifiedAt = props.modifiedAt
        this.createdAt = props.createdAt
    }
}

export interface Auth {
    isLoggedIn: boolean | undefined
    user?: AuthUser
}
