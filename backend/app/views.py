from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Sum, F
from .models import Dados
import json
import base64


def get_chart_data(request):
    if request.method == "POST":
        body_request = request.body.decode()

        body_dict = json.loads(body_request)

        json_dict = {
            "linhas": []
        }

        for row in body_dict:
            linha = {
                "colunas": []
            }

            for column in row["colunas"]:
                eixo_x = column["eixoX"]
                eixo_y = column["eixoY"]
                grafico = column["grafico"]

                pesquisa = list(Dados.objects.values(eixo_x).order_by(eixo_x).annotate(eixoX=F(eixo_x), eixoY=Sum(eixo_y)))

                coluna = {
                    "grafico": grafico,
                    "eixoX": list(map(lambda dado: dado["eixoX"], pesquisa)),
                    "eixoY": list(map(lambda dado: dado["eixoY"], pesquisa))
                }

                linha["colunas"].append(coluna)
            
            json_dict["linhas"].append(linha)

        json_response = json.dumps(json_dict).encode()

        base64_response = base64.b64encode(json_response).decode()

        return JsonResponse({"base64": base64_response}, status=200)
