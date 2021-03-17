import "./styles/default.scss";
import "./styles/index.scss";
import Dom from "./js/controllers/Dom";
import Container from "./js/components/Container";
import Header from "./js/components/Header";
import Introduction from "./js/components/Introduction";
import TechStack from "./js/components/TechStack";
import Projects from "./js/components/Projects";
import Contact from "./js/components/Contact";

Dom.print(
  document.querySelector("#root"),
  `${Container.init(Header, Introduction, TechStack, Projects, Contact)}`
);
