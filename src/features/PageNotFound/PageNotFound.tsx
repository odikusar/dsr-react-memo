import './PageNotFound.scss';

export function PageNotFoundFeature() {
  return (
    <>
      <div className="dsr-404__title">404</div>
      <div className="dsr-404__description" data-testid="sorryText">
        Sorry, page not found
      </div>
    </>
  );
}
