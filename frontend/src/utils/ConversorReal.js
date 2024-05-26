export function ConversorReal(num) { 
   if (typeof num === 'number') {
       return num.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
   }
   return '';
}
