import PropTypes from "prop-types";
import React from "react";
import { changeLanguage } from "redux-multilanguage";

const LanguageCurrencyChanger = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch
}) => {
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    setCurrency(currencyName);
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "en"
            ? "English"
            : currentLanguageCode === "vi"
            ? "Việt Nam"
            : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={e => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="vi" onClick={e => changeLanguageTrigger(e)}>
                Tiếng Việt
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency use-style">
        <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="USD" onClick={e => setCurrencyTrigger(e)}>
                USD
              </button>
            </li>
            <li>
              <button value="VND" onClick={e => setCurrencyTrigger(e)}>
                VND
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>Gọi cho chúng tôi: 1800 8198</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

export default LanguageCurrencyChanger;
