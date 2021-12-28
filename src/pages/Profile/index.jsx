import { default as ProfileClass } from "./Profile"
import { useParams } from "react-router-dom"

export default function Profile() {
    const { id } = useParams()
    return (
        <ProfileClass id={id} />
    )
}