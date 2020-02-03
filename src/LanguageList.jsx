import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_LANGS } from "./languages.query";

export const LanguageListOption = (props) => {
  const { language: { name} } = props;
  return <li className="language">{name}</li>;
}

export const LanguageList = () => {
  const { loading, error, data } = useQuery(GET_LANGS);

  if (loading) return (<div className="loading">{`"Cargando..."`}</div>);
  if (error) return (<div className="error">{`Ha ocurrido un error`}</div>);;

  return (
    <ol className="languages">
      {data.languages &&
        data.languages.map((language, key) => <LanguageListOption key={key} language={language} /> )}
     </ol>
  );
};
export default LanguageList;
