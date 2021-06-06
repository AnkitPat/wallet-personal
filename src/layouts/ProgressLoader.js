import { Spinner } from "reactstrap"

export const ProgressLoader = ({ size = 'sm' }) => {
    return (
        <div className="d-flex justify-content-center"><Spinner color="danger" size={size} /></div>
    )
}