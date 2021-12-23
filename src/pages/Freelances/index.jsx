import DefaultPicture from "../../assets/profile.png"
import Card from "../../components/Card"

const freelanceProfiles = [
    {
        name: 'Jane Doe',
        jobTitle: 'Devops',
        picture: DefaultPicture,
    },
    {
        name: 'John Doe',
        jobTitle: 'Developpeur frontend',
        picture: DefaultPicture,
    },
    {
        name: 'Jeanne Biche',
        jobTitle: 'Développeuse Fullstack',
        picture: DefaultPicture,
    },
]

export default function Freelances() {
    return (
        <div>
            <h1>Freelances</h1>
            {freelanceProfiles.map(({ name, jobTitle, picture }, index) => (
                <Card key={`${name}-${index}`} label={jobTitle} picture={picture} title={name} />
            ))}
        </div>
    )
}