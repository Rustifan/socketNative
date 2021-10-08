import { format } from "date-fns";
import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { socket } from "../socket";


const Test: React.FC = () => {
  const [date, setDate] = useState("");

  socket.on("ping", (response: { data: string }) => {
    const formatedDate = format(new Date(response.data), "hh:mm:ss");
    setDate(formatedDate);
  });

  const handleDisconnect = () => {
    socket.disconnect();
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{date}</Text>
      <Button title="Disconnect" onPress={handleDisconnect} />
      <Button title="Connect" onPress={()=>socket.connect()}/>
      
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
  },
});
