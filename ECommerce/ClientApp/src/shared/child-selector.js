

export default function ChildSelector({ child,setChild }) {
    return (
        <button
            type="button"
            className="col p-5 m-1 border border-primary fw-bold"
            onClick={() => setChild(child.childId)}
        >
            {child.childName}
        </button>
    )

}

