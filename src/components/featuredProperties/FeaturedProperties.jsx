import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { loading, data, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Loading, please wait..."
      ) : (
        <>
          {data.map((property) => {
            return (
              <div className="fpItem" key={property._id}>
                <img src={property.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{property.name}</span>
                <span className="fpCity">{property.city}</span>
                <span className="fpPrice">
                  Starting from ${property.cheapestPrice}
                </span>
                {property.rating ? (
                  <div className="fpRating">
                    <button>{property.rating}</button>
                    <span>Excellent</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
