import React from "react";
import { Container } from "reactstrap";
import { Button,Input } from 'reactstrap';

export default function Logo() {
  return (
   
      <Container>
              <img
                alt="..."
                className="img-fluid rounded-circle shadow-lg"
                src={require("assets/img/mike.jpg")}
                style={{ width: "800px" }}
              /> 
      <Input
       placeholder="Nombre o Alias "
      />
      <Input
       placeholder="Edad "
    />
      <Button color="success">JUGAR</Button>
      </Container>
  
  );
}