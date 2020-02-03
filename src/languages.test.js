import React from "react";
import { expect } from "chai";
import enzyme, { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { MockedProvider } from "@apollo/react-testing";
import LanguagesList from "./LanguageList";
import { GET_LANGS } from "./languages.query";
import { act } from "react-dom/test-utils";

const customWait =  async (ms = 0) => {
  await act( () => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
  );
};

configure({ adapter: new Adapter() });
describe("LanguagesList tests", () => {
  let mocks = {};
  const languages = [
    { code: "af", name: "Afrikaans", rtl: null },
    { code: "am", name: "Amharic", rtl: null },
    { code: "ar", name: "Arabic", rtl: 1 },
    { code: "ay", name: "Aymara", rtl: null }
  ];
  beforeEach(() => {
    mocks = { 
      request: { query: GET_LANGS, variables: {} },
      result : {}
     };
  });
  
  it("LanguagesList renders without error", () => {
    mocks.result = {
      languages: languages
    };
    enzyme.mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LanguagesList />
      </MockedProvider>
    );
  });

  it("LanguagesList renders loading message", () => {
    mocks.result = {
      languages: languages
    };
    const component = enzyme.mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LanguagesList />
      </MockedProvider>
    );
    expect(component.find(".loading")).to.exist;
  });


  it("LanguagesList renders error message", async () => {
    mocks.error = new Error('RANDOM_ERROR');
    const component = enzyme.mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LanguagesList />
      </MockedProvider>
    );
    await customWait(0);
    component.update();
    expect(component.find(".error")).to.exist;
  });

  it('LanguagesList renders all the mocked languages', async () => { 
    mocks.result = {
      data: {
        languages: [
          { code: "af", name: "Afrikaans", rtl: null },
          { code: "am", name: "Amharic", rtl: null },
          { code: "ar", name: "Arabic", rtl: 1 },
          { code: "ay", name: "Aymara", rtl: null }
        ]
      }
    };

    const component = enzyme.mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LanguagesList />
      </MockedProvider>);
    await customWait(0);
    component.update();
    expect(component.find(".languages")).to.exist;
    expect(component.find(".language")).to.have.length(languages.length);
    
  });
});