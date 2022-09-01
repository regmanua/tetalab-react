export default function Feedback(props) {
      const humanDate = new Date(props.post.date).toLocaleString('uk-UA');
  return (
    <div className="flex flex-col py-3">
      <p className="text-md">{props.post.feedback}</p>
      <div className="py-2">
        <span className="pr-2"><b>Rated: </b>{props.post.rate}</span>
        <span className="pr-2"><b>Author: </b>{props.post.name}</span>
        <span className="pr-2"><b>Added: </b>{humanDate}</span>
      </div>
      <div className="my-2">
        <button 
          type="button" 
          className="border rounded border-red-600 text-red-600 py-2 px-4 hover:bg-red-800 hover:text-white" 
          onClick={props.handleDelete}>Delete</button>
      </div>
    </div>
  )
}