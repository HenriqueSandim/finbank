export const printHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Relatório</title>

    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="m-10">
      <div>
        <h1 class="text-3xl font-semibold text-[#4d4d4d]">Transferência</h1>
        <p class="text-[#666666] mt-4">Transação: <%=receipt.id%></p>
        <p class="text-[#666666]"><%=receipt.date%></p>
      </div>
      <hr class="my-4"></hr>
      <div>
        <h3 class="text-[#666666] text-2xl font-semibold">Destinatário</h3>
        <p class="text-[#666666] text-xl mt-2"><%=receipt.receiverName%></p>
        <p class="text-[#666666] text-xl">CPF: <%=receipt.receiverCPF%></p>
        <p class="text-[#666666] text-xl">Instituição: FinBank</p>
      </div>
      <div>
        <h3 class="text-[#666666] text-2xl font-semibold mt-4">Dados do pagador</h3>
        <p class="text-[#666666] text-xl mt-2"><%=receipt.senderName%></p>
        <p class="text-[#666666] text-xl">CPF: <%=receipt.senderCPF%></p>
        <p class="text-[#666666] text-xl">Instituição: FinBank</p>
      </div>
      <hr class="my-4"></hr>
      <div>
        <h3 class="text-[#666666] text-2xl font-semibold mt-4">Dados gerais</h3>
        <p class="text-[#666666] text-xl mt-2">Valor Original: <%=receipt.value%></p>
        <p class="text-[#666666] text-xl">Identificador: <%=receipt.id%></p>
      </div>
      <hr class="my-4"></hr>
      <div>
        <div class="flex justify-between mb-2">
          <p class="text-[#666666] text-xl">Pagamento</p>
          <p class="text-[#666666] text-xl font-semibold">Saldo</p>
        </div>
        <div class="flex justify-between">
          <p class="text-[#666666] text-xl">Total pago</p>
          <p class="text-[#666666] text-xl font-semibold"><%=receipt.value%></p>
        </div>
      </div>
      <hr class="my-4"></hr>
      <div class="flex justify-between">
        <h3 class="text-[#666666] text-3xl font-semibold">Valor</h3>
        <p class="text-[#666666] text-3xl font-semibold"><%=receipt.value%></p>
      </div>
      <hr class="my-4"></hr>
      <div class="flex flex-col justify-center items-center gap-4 mt-20">
        <h3 class=" text-2xl font-light">Dúvidas? Acesse a nossa <span class="font-medium underline">Central de ajuda</span></h3>
        <p class="text-[#00A181] font-bold text-2xl">FinBank</p>
        <p class=" text-2xl font-light">CNPJ 22.343.121/0001-09</p>
      </div>
    </div>
  </body>
</html>
`;
