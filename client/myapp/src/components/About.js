import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
class About extends Component {
  state = {};
  render() {
    return (
      <Container fluid>
        <h1 className = "text-center mb-4 mt-5">About The GUC</h1>
        <p style={{fontSize :"170%"}}>
          The German University in Cairo, GUC, is an Egyptian Private University
          founded by the presidential decree 27/2002, according to the law
          number 101/1992 and its executive regulations number 355/1996. German
          university in Cairo/Deutsche Universität in Kairo has been established
          in 2002 in cooperation with the State Universities of Ulm and
          Stuttgart, under the patronage of the Egyptian Ministry of Higher
          Education, the Ministry of Science, Research and Arts, State of Baden-
          Württemberg, Germany, and supported by the German Academic Exchange
          Service (DAAD), the German Embassy in Cairo, the Arab/German Chamber
          of Industry and Commerce (AHK), the Federal Ministry of Education and
          Research, Germany, The State University of Tübingen, The State
          University of Mannheim and the Academy of Fine Arts Leipzig. The
          German University in Cairo is an independent, non-profit oriented
          Egyptian private institution, managed by a consortium of Germans and
          Egyptians with the vision of building a leading center of excellence
          in teaching and research that will effectively contribute to the
          general welfare nationally and internationally and endeavour the
          scientific, technical, economic and cultural cooperation between Egypt
          and Germany.
        </p>
        
      </Container>
    );
  }
}

export default About;
