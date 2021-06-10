import React from 'react';

const ProductDescription = (props) => {

    const slogan = props.product.slogan;
    const description = props.product.description;
    const features = props.product.features;

    return(
      <>
        <div id="description">
          { slogan && <p>{ slogan }</p> }
          { description && <p>{ description }</p> }
        </div>
        <div id="features">
          { features.length && <ul className="features">{features.map((feature) => (
            <li>{ feature.feature }: { feature.value }</li>
          ))}</ul>}
        </div>
      </>
    )
}

export default ProductDescription;
