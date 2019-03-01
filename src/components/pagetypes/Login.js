import React, { useState } from "react"
import { connect } from "react-redux"
import { firebaseAuth } from '../../config/firebase'

const Login = ({ history, auth }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = event => {
        event.preventDefault()
        firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail("")
                setPassword("")
                history.push("/")
            })
            .catch(error => {
                alert(error)
            })
    }

    const logOut = () => {
        firebaseAuth
            .signOut()
            .then(() => {
                history.push("/")
            })
    }

    const keyPress = event => {
        if (event.key === 'Enter') {
            onSubmit(event)
        }
    }

    const onChange = event => {
        if (event.target.name === "email") {
            setEmail(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    if (!auth) {
        return <div>
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Sähköposti"
                onKeyPress={keyPress}
            />
            <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Salasana"
                onKeyPress={keyPress}
            />
            <button className="btn-primary" type="submit" onClick={onSubmit}>
                Kirjaudu sisään
            </button>
        </div>
    } else {
        return <div>
            <button className="btn-primary" type="button" onClick={logOut}>
                Kirjaudu ulos tililtä {auth.email}
            </button>
        </div>
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Login)
