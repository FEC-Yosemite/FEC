import React from 'react';

const ProductDescription = (props) => {

    const slogan = props.product.slogan;
    const description = props.product.description;
    const features = props.product.features;

    return(
      <>
        <div id="description">
          { slogan && <h4>{ slogan }</h4> }
          { description && <p>{ description }</p> }
        </div>
        <div id="features">
          { features.length && <ul className="features">{features.map((feature) => (
            <li key={feature.feature}>{ feature.feature }: { feature.value }</li>
          ))}</ul>}
        </div>
      </>
    )
}

export default ProductDescription;
