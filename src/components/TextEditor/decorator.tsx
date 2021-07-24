import { CompositeDecorator, DraftDecorator } from "draft-js";
import {
  TextEditorDecoratorLink,
  findLinkEntities,
} from "./TextEditorDecoratorLink";

const linkDecorator: DraftDecorator = {
  component: TextEditorDecoratorLink,
  strategy: findLinkEntities,
};

export const decorator = new CompositeDecorator([linkDecorator]);
