import React from "react";
import { EditorState, RichUtils } from "draft-js";
import { render, fireEvent } from "@testing-library/react";

import { TextEditor } from "../";

describe("TextEditor", () => {
  beforeEach(() => {
    // quick dirty fix so I can continue without spending time configuring jest
    window.scrollTo = jest.fn();
  });

  describe("ToolBar Actions", () => {
    /**
     * NOTES:
     * Probably the best approach to test the Editor's behavior would be with Cypress so we can
     * make sure draft.js is behaving as expected, but because I am running out of time I am just adding an example
     * of how I'd unit test the actions to validate correct draft's API's calls
     */
    test("bold action triggers the correct draftjs api call", () => {
      const spy = jest.spyOn(RichUtils, "toggleInlineStyle");
      const { getByRole } = render(<TextEditor />);
      const boldButton = getByRole("button", { name: /bold/i });

      fireEvent.click(boldButton);

      expect(spy.mock.calls[0][0] instanceof EditorState).toBeTruthy();
      expect(spy.mock.calls[0][1]).toBe("BOLD");
    });
  });
});
