from django.db import models


class Dados(models.Model):
    idCliente = models.IntegerField(null=True)
    nomeFantasia = models.CharField(max_length=255, null=True)
    idVeiculo = models.IntegerField(null=True)
    veiculoNome = models.CharField(max_length=255, null=True)
    idLinha = models.IntegerField(null=True)
    linhaNome = models.CharField(max_length=255, null=True)
    idMotorista = models.IntegerField(null=True)
    motoristaNome = models.CharField(max_length=255, null=True)
    motoristaMatricula = models.IntegerField(null=True)
    idViagem = models.IntegerField(null=True)
    viagemInicio = models.DateTimeField(null=True)
    viagemRetorno = models.DateTimeField(null=True)
    viagemFim = models.DateTimeField(null=True)
    viagemMetrosPercorridos = models.FloatField(null=True)
    dataHoraGPS = models.DateTimeField(null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    hodometro = models.FloatField(null=True)
    inercia = models.FloatField(null=True)
    rpmElevado = models.FloatField(null=True)
