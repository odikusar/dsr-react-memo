import appMemoSrc from 'assets/images/app-memo.jpg';
import screenMemoAppSrc from 'assets/images/screen-memo-app.png';
import { ROWS_PER_PAGE } from 'constants/index';
import './About.scss';

export function AboutFeature() {
  return (
    <div className="dsr-about-content" data-testid="aboutPage">
      <p>
        This application helps to work with custom dictionary files in CSV
        format. For learning foreign words.
      </p>
      <p>
        The app randomly picks up words and remembers them so they don't repeat
        twice.
      </p>
      <p>Words divided into pages, {ROWS_PER_PAGE} words per page.</p>
      <p>
        CSV file must contain 2 columns - word and translation. <br />
        It is possible to have a third flag column showing the importance of the
        word.
      </p>
      <p className="dsr-image-screen">
        <img src={screenMemoAppSrc} alt="" />
      </p>

      <p>You can install the app on your phone as Progressive Web App:</p>
      <p className="dsr-image-screen">
        <img src={appMemoSrc} alt="" />
      </p>
    </div>
  );
}
