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

        dados = list(Dados.objects.values(body_dict["eixoX"]).order_by(body_dict["eixoX"]).annotate(eixoX=F(body_dict["eixoX"]), eixoY=Sum(body_dict["eixoY"])))

        dict_response = {
            "dados": dados
        }

        json_response = json.dumps(dict_response).encode()

        base64_response = base64.b64encode(json_response).decode()

        return JsonResponse({"base64": base64_response}, status=200)
