function Card(props) {
  const { name, price, description, status } = props.phone;

  return (
    <div className="card" style={{ width: "25rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{price}</h6>
        <p className="card-text">{description}</p>

        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}


export default Card;
