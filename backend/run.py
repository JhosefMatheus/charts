import pandas as pd
import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    database="telemetria",
    password="Bambam&xx12"
)

cursor = connection.cursor()

df = pd.read_csv("DadorecebidoTelemetriaGeral.csv")

for index, row in df.iterrows():
    id_cliente = int(row["IdCliente"]) if not pd.isna(row["IdCliente"]) else None
    nome_fantasia = row["NomeFantasia"]
    id_veiculo = int(row["IdVeiculo"]) if not pd.isna(row["IdVeiculo"]) else None
    veiculo_nome = row["VeiculoNome"]
    id_linha = int(row["IdLinha"]) if not pd.isna(row["IdLinha"]) else None
    linha_nome = row["LinhaNome"]
    id_motorista = int(row["IdMotorista"]) if not pd.isna(row["IdMotorista"]) else None
    motorista_nome = row["MotoristaNome"]
    motorista_matricula = row["MotoristaMatricula"]
    id_viagem = int(row["IdViagem"]) if not pd.isna(row["IdViagem"]) else None
    viagem_inicio = row["ViagemInicio"]
    viagem_retorno = row["ViagemRetorno"]
    viagem_fim = row["ViagemFim"]
    viagem_metros_percorridos = float(row["ViagemMetrosPercorridos"])
    data_hora_gps = row["DataHoraGPS"]
    latitude = float(row["Latitude"]) if not pd.isna(row["Latitude"]) else None
    longitude = float(row["Longitude"]) if not pd.isna(row["Longitude"]) else None
    hodometro = float(row["Hodometro"]) if not pd.isna(row["Hodometro"]) else None
    inercia = float(row["Inercia"]) if not pd.isna(row["Inercia"]) else None
    rpm_elevado = float(row["RPMElevado"]) if not pd.isna(row["RPMElevado"]) else None

    sql = """
        insert into app_dados (idCliente, nomeFantasia, idVeiculo, veiculoNome, idLinha, linhaNome, idMotorista, motoristaNome, motoristaMatricula, idViagem, viagemInicio, viagemRetorno, viagemFim, viagemMetrosPercorridos, dataHoraGPS, latitude, longitude, hodometro, inercia, rpmElevado)
        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """

    values = (id_cliente, nome_fantasia, id_veiculo, veiculo_nome, id_linha, linha_nome, id_motorista, motorista_nome, motorista_matricula, id_viagem, viagem_inicio, viagem_retorno, viagem_fim, viagem_metros_percorridos, data_hora_gps, latitude, longitude, hodometro, inercia, rpm_elevado)

    cursor.execute(sql, values)

connection.commit()

cursor.close()

connection.close()