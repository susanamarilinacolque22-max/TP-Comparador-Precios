import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';

// 1. DEFINIMOS LOS PRODUCTOS Y SUS PRECIOS
const productos = [
  { id: 1, nombre: 'Yerba', precios: { maria: 5000, jose: 4800, norte: 5200 } },
  { id: 2, nombre: 'Leche', precios: { maria: 1500, jose: 1400, norte: 1600 } },
  { id: 3, nombre: 'Pan', precios: { maria: 2000, jose: 1800, norte: 2100 } },
  { id: 4, nombre: 'Azúcar', precios: { maria: 1200, jose: 1100, norte: 1300 } },
];

export default function App() {
  // Estado para guardar qué productos seleccionó el usuario
  const [seleccionados, setSeleccionados] = useState([]);
  
  // Estado para guardar los totales calculados
  const [totales, setTotales] = useState(null);

  // Función para seleccionar o deseleccionar un producto
  const toggleProducto = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter(item => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
    setTotales(null); // Reiniciamos los totales al cambiar la selección
  };

  // Función para calcular los totales
  const calcularTotales = () => {
    let totalMaria = 0;
    let totalJose = 0;
    let totalNorte = 0;

    productos.forEach(prod => {
      if (seleccionados.includes(prod.id)) {
        totalMaria += prod.precios.maria;
        totalJose += prod.precios.jose;
        totalNorte += prod.precios.norte;
      }
    });

    setTotales({
      maria: totalMaria,
      jose: totalJose,
      norte: totalNorte
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Comparador de Precios</Text>
      <Text style={styles.subtitulo}>Selecciona los productos que quieres comprar:</Text>

      {/* Lista de productos */}
      {productos.map((prod) => (
        <TouchableOpacity 
          key={prod.id} 
          style={[styles.item, seleccionados.includes(prod.id) && styles.itemSeleccionado]}
          onPress={() => toggleProducto(prod.id)}
        >
          <Text style={styles.itemTexto}>{prod.nombre}</Text>
        </TouchableOpacity>
      ))}

      {/* Botón para calcular */}
      <View style={styles.botonContainer}>
        <Button title="Calcular Totales" onPress={calcularTotales} color="#007AFF" />
      </View>

      {/* Resultados */}
      {totales && (
        <View style={styles.resultados}>
          <Text style={styles.tituloResultados}>Costo Total de la Compra:</Text>
          <Text style={styles.resultadoTexto}>Despensa María: ${totales.maria}</Text>
          <Text style={styles.resultadoTexto}>Almacén Don José: ${totales.jose}</Text>
          <Text style={styles.resultadoTexto}>Supermercado Norte: ${totales.norte}</Text>
        </View>
      )}
    </ScrollView>
  );
}

// Estilos (Fondo blanco y letras negras)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemSeleccionado: {
    backgroundColor: '#d1e8ff',
    borderColor: '#007AFF',
  },
  itemTexto: {
    fontSize: 18,
    color: '#000000',
  },
  botonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  resultados: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4caf50',
    marginTop: 10,
  },
  tituloResultados: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultadoTexto: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
});
