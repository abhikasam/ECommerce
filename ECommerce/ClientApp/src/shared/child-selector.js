

export default function ChildSelector({ child }) {
    return (
        <button
            type="button"
            className="col p-5 m-1 border border-primary fw-bold">
            {child.childName}
        </button>
    )

}

