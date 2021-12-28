import { Component } from "react"
import styled from "styled-components"
import ErrorPopup from "../../components/ErrorPopup"
import { Loader } from "../../utils/style/Atoms"

const ProfileContainer = styled.div.attrs(props => ({ className: 'page borderBoxSizing' }))`
    justify-content: center;
    text-align: center;
    display: flex;
`

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: {},
            isLoading: false,
            error: false
        }
    }

    getState = () => {
        return this.state
    }

    setProfileData = (profileData) => {
        this.setState({ ...this.getState(), profileData: profileData })
    }

    setLoading = (isLoading) => {
        this.setState({ ...this.getState(), isLoading: isLoading })
    }

    setError = (error) => {
        this.setState({ ...this.getState(), error: error })
    }
    componentDidMount() {
        const { id } = this.props
        this.setLoading(true)
        fetch(`http://localhost:8000/freelance?id=${id}`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ ...this.getState(), profileData: jsonResponse?.freelanceData, isLoading: false })
            })
            .catch(error => this.setError(true))
    }

    render() {
        const { profileData, error, isLoading } = this.state
        const { picture, name, location, tjm, job, skills, available, id } = profileData
        return (
            error ? (
                <ErrorPopup />
            ) : (
                <ProfileContainer>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div>
                            <img src={picture} alt={name} height={150} width={150} />
                            <h1>{name}</h1>
                            <span>{location}</span>
                            <h2>{job}</h2>
                            <div>
                                {skills &&
                                    skills.map((skill) => (
                                        <div key={`skill-${skill}-${id}`}>{skill}</div>
                                    ))}
                            </div>
                            <div>{available ? 'Disponible maintenant' : 'Indisponible'}</div>
                            <span>{tjm} € / jour</span>
                        </div>
                    )}
                </ProfileContainer>
            )

        )
    }
}