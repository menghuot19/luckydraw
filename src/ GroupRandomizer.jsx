import { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";

export default function GroupRandomizer() {
  const [names, setNames] = useState("");
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState([]);
  const [participants, setParticipants] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/svg+xml" || file.type === "text/plain")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNames(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .svg or .txt file");
    }
  };

  const generateGroups = () => {
    let nameList = names.split(/\n|,/).map(name => name.trim()).filter(name => name);
    setParticipants(nameList);
    nameList = nameList.sort(() => Math.random() - 0.5);
    const newGroups = Array.from({ length: groupCount }, () => []);
    nameList.forEach((name, index) => {
      newGroups[index % groupCount].push(name);
    });
    setGroups(newGroups);
  };

  const exportAsTxt = () => {
    let content = "Random Group Generator Results:\n\n";
    groups.forEach((group, idx) => {
      content += `Group ${idx + 1} (${group.length} members):\n`;
      content += group.join("\n") + "\n\n";
    });
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "group_results.txt";
    link.click();
  };

  return (
    <Container>
      <h2 className="mb-3">Random Group Generator</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter names (comma or new line separated)</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload a .svg or .txt file</Form.Label>
          <Form.Control type="file" accept=".svg,.txt" onChange={handleFileUpload} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Groups</Form.Label>
          <Form.Control
            type="number"
            value={groupCount}
            min="1"
            onChange={(e) => setGroupCount(Number(e.target.value))}
          />
        </Form.Group>
        <Button onClick={generateGroups} className="w-100 mb-4">
          Generate Groups
        </Button>
        {groups.length > 0 && (
          <Button onClick={exportAsTxt} className="w-100 mb-4">
            Export as TXT
          </Button>
        )}
      </Form>
      
      {participants.length > 0 && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>All Participants ({participants.length})</Card.Title>
            <ul className="list-unstyled">
              {participants.map((participant, i) => (
                <li key={i}>{participant}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}
      
      <Row>
        {groups.map((group, idx) => (
          <Col key={idx} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Group {idx + 1} ({group.length} members)</Card.Title>
                <ul className="list-unstyled">
                  {group.map((member, i) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
