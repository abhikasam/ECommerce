

export default function ItemSelector({ item }) {  

    return (
        <button
            type="button"
            className="col p-5 m-1 border border-primary fw-bold">
            {item.value}
        </button>
    )
}
