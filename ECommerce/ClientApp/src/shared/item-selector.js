

export default function ItemSelector({ item, setItem }) {  

    return (
        <button
            type="button"
            className="col p-5 m-1 border border-primary fw-bold"
            onClick={(event) => setItem(item.key)}
        >
            {item.value}
        </button>
    )
}
