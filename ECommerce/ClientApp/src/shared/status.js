

export const status = {
    message: '',
    type: ''
}


export default function Status({ status:sts }) {
    return (
        <>
            {!!sts.message.length &&
                <div className={"row rowpad5px"}>
                    <div className="col-8 text-start">
                        <div className={'alert-' + sts.type} style={{ whiteSpace: "pre-wrap" }}>
                            <div className={'p-3 text-' + sts.type}>{sts.message}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
