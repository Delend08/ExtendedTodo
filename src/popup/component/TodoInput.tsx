
export default function TodoInput() {

    return (
        <div className="form-container">
            <form method="post" className="form">
                <input type="text" placeholder="할 일 입력.." name="todo" className="input-text" />
                <button type="submit" className="button-add">추가</button>
            </form>
        </div>
    )

}