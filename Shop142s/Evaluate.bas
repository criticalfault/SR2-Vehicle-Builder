Attribute VB_Name = "Evaluate"
Const MAX_EC = 6    ' max objects in an expression class

Dim ec_ref(MAX_EC) As String    ' :, := (Referentials)
Dim ec_cond(MAX_EC) As String   ' ?, <<, >> (Conditionals)
Dim ec_exp(MAX_EC) As String    ' ^ (Exponential operators)
Dim ec_geo(MAX_EC) As String    ' *, / (Geometric operators)
Dim ec_arith(MAX_EC) As String  ' +, -, &, | (Arithmetic and bitwise operators)
Dim ec_comp(MAX_EC) As String   ' <, >, ==, <=, >= (Comparison operators)
Dim ec_logic(MAX_EC) As String  ' &&, ||
Dim ec_eval(MAX_EC) As String   ' =, +=, -=, *=, /= (Assignment operators)
Dim ec_other(MAX_EC) As String  ' ; (Pre-evaluation operators)

' Collections for Local and Global variables
Public varG As Collection
Public varL As Collection

Public Sub Init_Eval()
    Set varG = New Collection
    Set varL = New Collection

    ec_ref(1) = ":"     ' x : y1 y2, returns y(x)
    ec_ref(2) = ":="    ' x : y1 y2, returns z where y(z) = x

    ec_cond(1) = "?"    ' read shop.dat if you want to understand this
    ec_cond(2) = "<<"   ' x << y => min (x, y)
    ec_cond(3) = ">>"   ' x >> y => max (x, y)
    
    ec_exp(1) = "^"
    
    ec_geo(1) = "*"
    ec_geo(2) = "/"
    
    ec_arith(1) = "+"
    ec_arith(2) = "-"
    ec_arith(3) = "&"
    ec_arith(4) = "|"
    
    ec_comp(1) = "<"
    ec_comp(2) = "<="
    ec_comp(3) = "=="
    ec_comp(4) = ">="
    ec_comp(5) = ">"
    ec_comp(6) = "!="
    
    ec_logic(1) = "&&"
    ec_logic(2) = "||"
    
    ec_eval(1) = "="
    ec_eval(2) = "+="
    ec_eval(3) = "-="
    ec_eval(4) = "*="
    ec_eval(5) = "/="

    ' clear local & global variables
    While varL.Count > 0
        varL.Remove 1
    Wend
    While varG.Count > 0
        varG.Remove 1
    Wend
End Sub

Public Sub Clear_Vars()
    ' clear local & global variables
    While varL.Count > 0
        varL.Remove 1
    Wend
    While varG.Count > 0
        varG.Remove 1
    Wend
End Sub

Public Function Eval(d As Object, expr As String)
Dim es As New Collection
Dim l$, r$, s%, q%
Dim line As String
Dim retval
    
    If ec_geo(1) = "" Then
        Init_Eval
    End If

    ' break up expr into statements separated by ';'
    While Len(expr) > 0
        l$ = ""
        s = 0
        q = 0
        
        ' handle quoted semis
        While q <= s
            s = InStr(q + 1, expr, ";")
            q = InStr(q + 1, expr, """")
            If q = 0 Then q = Len(expr)
        Wend
            
        If s > 0 Then
            l$ = Left$(expr, s - 1)
            expr = LTrim$(Mid$(expr, s + 1))
        Else
            l$ = expr
            expr = ""
        End If
        es.Add l$
    Wend
    
    ' loop through statements and evaluate them
    ' clear local variables
    While varL.Count > 0
        varL.Remove 1
    Wend
        
    retval = 0
    For idx = 1 To es.Count
        ' break statement into ()'d chunks here?
        retval = EvalStatement(d, es(idx))
    Next idx
    If retval Like "'*'" Then
        retval = Mid$(retval, 2, Len(retval) - 2)
    End If
    Eval = retval
End Function

Public Function EvalStatement(d As Object, expr As String)
Dim parse As String
Dim e As New Collection
Dim value As Variant, v1, v2

' d is the variable space in which to operate
' An expr is:
' expr: expr1 op expr2
' op: '=', '+', '-', '*', '/', '<', '>', '=='
' '=' -> Assignment, assigns expr1 the value of expr2, returns expr1
' '+', '=', '*', '/' -> Arithmetic, applies operation
' '<', '>', '==' -> Evaluation, returns boolean true/false

    On Error GoTo StatementError
    
    ' Build list of "expr (op expr)*"
    ' numbered 1..n for n args/ops
    parse = expr
    idx = 0
    While Len(parse) > 0
        idx = idx + 1
        e.Add GetToken(parse)
    Wend
    
    ' Evaluations replace "expr1" with the value of "expr1 op expr2"
    ' Evaluate referentials, left to right
    idx = Find(e, ec_ref)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        If e(idx) = ":" Then
            value = EV(d, e(idx - 1))
            If value < 1 Then
                value = 1
            ElseIf value > e.Count - idx Then
                value = e.Count - idx
            End If
            value = EV(d, e(idx + value))
        ElseIf e(idx) = ":=" Then
            v1 = EV(d, e(idx - 1))
            ' compare this to the remaining values
            idx2 = idx + 1
            While idx2 <= e.Count
                v2 = EV(d, e(idx2))
                If v1 Like v2 Then
                    'done
                    value = idx2 - idx
                    idx2 = e.Count + 1
                Else
                    ' loop
                    idx2 = idx2 + 1
                End If
            Wend
        End If
        e.Add Item:=value, Before:=idx - 1
        ' Remove everything until the end of the statement
        While e.Count >= idx
            e.Remove (idx)
        Wend
        idx = Find(e, ec_ref)
    Wend
    
    ' Evaluate '^', left to right
    idx = Find(e, ec_exp)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        If e(idx) = "^" Then
            value = EV(d, e(idx - 1)) ^ EV(d, e(idx + 1))
        End If
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_exp)
    Wend
    
    ' Evaluate '*', '/', left to right
    idx = Find(e, ec_geo)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        If e(idx) = "*" Then
            value = EV(d, e(idx - 1)) * EV(d, e(idx + 1))
        ElseIf e(idx) = "/" Then
            value = EV(d, e(idx - 1)) / EV(d, e(idx + 1))
        End If
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_geo)
    Wend
    
    ' Evaluate '+', '-', left to right
    idx = Find(e, ec_arith)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        If e(idx) = "+" Then
            value = EV(d, e(idx - 1)) + EV(d, e(idx + 1))
        ElseIf e(idx) = "-" Then
            value = EV(d, e(idx - 1)) - EV(d, e(idx + 1))
        ElseIf e(idx) = "&" Then
            value = EV(d, e(idx - 1)) And EV(d, e(idx + 1))
            Assign d, "Global.test", value
        ElseIf e(idx) = "|" Then
            value = EV(d, e(idx - 1)) Or EV(d, e(idx + 1))
            Assign d, "Global.test", value
        End If
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_arith)
    Wend
    
    ' Evaluate conditionals
    idx = Find(e, ec_cond)
    While idx <> 0
        v1 = EV(d, e(idx - 1))
        v2 = EV(d, e(idx + 1))
        ' eval (idx-1) idx (idx+1)
        If e(idx) = "?" Then
            value = IIf(EV(d, "Global.test"), v1, v2)
        ElseIf e(idx) = "<<" Then
            value = IIf(v1 < v2, v1, v2)
        ElseIf e(idx) = ">>" Then
            value = IIf(v1 > v2, v1, v2)
        End If
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_cond)
    Wend
    
    ' Evaluate '<', '>', '==', left to right
    idx = Find(e, ec_comp)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        If e(idx) = "<" Then
            value = IIf(EV(d, e(idx - 1)) < EV(d, e(idx + 1)), True, False)
        ElseIf e(idx) = "<=" Then
            value = IIf(EV(d, e(idx - 1)) <= EV(d, e(idx + 1)), True, False)
        ElseIf e(idx) = "==" Then
            value = IIf(EV(d, e(idx - 1)) Like EV(d, e(idx + 1)), True, False)
        ElseIf e(idx) = ">=" Then
            value = IIf(EV(d, e(idx - 1)) >= EV(d, e(idx + 1)), True, False)
        ElseIf e(idx) = ">" Then
            value = IIf(EV(d, e(idx - 1)) > EV(d, e(idx + 1)), True, False)
        ElseIf e(idx) = "!=" Then
            value = IIf(Not EV(d, e(idx - 1)) Like EV(d, e(idx + 1)), True, False)
        End If
        Assign d, "Global.test", value
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_comp)
    Wend
    
    ' Evaluate '&&', '||', left to right
    idx = Find(e, ec_logic)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        If e(idx) = "&&" Then
            value = IIf(CBool(EV(d, e(idx - 1))) = True And CBool(EV(d, e(idx + 1))) = True, True, False)
        ElseIf e(idx) = "||" Then
            value = IIf(CBool(EV(d, e(idx - 1))) = True Or CBool(EV(d, e(idx + 1))) = True, True, False)
        End If
        Assign d, "Global.test", value
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_logic)
    Wend
    
    ' Evaluate '=', left to right
    idx = Find(e, ec_eval)
    While idx <> 0
        ' eval (idx-1) idx (idx+1)
        value = EV(d, e(idx + 1))
        ' Assignments may not be to the form variables...
        If e(idx) = "=" Then
            Assign d, e(idx - 1), value
        ElseIf e(idx) = "+=" Then
            Assign d, e(idx - 1), EV(d, e(idx - 1)) + value
        ElseIf e(idx) = "-=" Then
            Assign d, e(idx - 1), EV(d, e(idx - 1)) - value
        ElseIf e(idx) = "*=" Then
            Assign d, e(idx - 1), EV(d, e(idx - 1)) * value
        ElseIf e(idx) = "/=" Then
            Assign d, e(idx - 1), EV(d, e(idx - 1)) / value
        End If
        
        e.Add Item:=value, Before:=idx - 1
        e.Remove (idx + 2)
        e.Remove (idx + 1)
        e.Remove (idx)
        idx = Find(e, ec_eval)
    Wend
    
    If e.Count Then
        'MsgBox e(1)
        EvalStatement = EV(d, e(1))
    End If
    
    Exit Function
StatementError:
    MsgBox "Error in statement '" & expr & "'"
'    Resume
    Exit Function
End Function

Public Sub Assign(dest As Object, var As Variant, value As Variant)
Dim idx As Integer
    ' Basically performs Var = value
    idx = InStr(var, ".")
    If idx = 0 Then
        ' evaluate v in dest
        On Error Resume Next
        ' if it's quoted, remove the quotes
        If value Like "'*" Then
            value = Mid$(value, 2, Len(value) - 2)
        End If
        dest(var) = value
    Else
        Dim ns As String, vn As String
        ' Break v into namespace and variable name (ie "Engine" and "Speed")
        ns = Left$(var, idx - 1)
        vn = Mid$(var, idx + 1)
        
        Select Case ns
            Case "c"
                ns = "Chassis"
            Case "e"
                ns = "Engine"
            Case "g"
                ns = "Global"
            Case "l"
                ns = "Local"
        End Select
        
        On Error Resume Next
'        Dim value As Object
        Select Case ns
            Case "Chassis"
                v.Chassis.value(vn) = value
            Case "Engine"
                v.Engine.value(vn) = value
            Case "Global"
                varG.Remove vn
                varG.Add Item:=value, Key:=vn
                'varG.Item(vn) = value
            Case "Local"
                varL.Remove vn
                varL.Add Item:=value, Key:=vn
                'varL.Item(vn) = value
        End Select
    End If
End Sub

Public Function EV(dest As Object, var As Variant)
Dim value
    ' If v is a string, evaluate it in dest
    ' If v is a number, return it
    On Error Resume Next
    If IsNumeric(var) Or IsNumeric(Left$(var, 1)) Then
        ' It's a number
        ' MUST IGNORE LOCALE!  MUST USE DECIMAL POINT!
        ' BAD VB!  BAD VB!
        ' ARGGH!  IT GETS WORSE!
        ' I have to choose which to use based on whether it's a
        ' loaded value or a calculated one!
        'EV = CSng(var)
        If VarType(var) = 11 Or InStr(var, ",") Then
            ' boolean
            EV = CDbl(var)
        Else
            ' it's a *real* number
            EV = val(var)
        End If
        Exit Function
    ElseIf var Like "'*" Then
        ' It starts with a '
        EV = CStr(var)
        Exit Function
    End If
    
    ' So v can either be a variable reference, or a derived variable reference
    ' (ie either Level, or Engine.Speed)
    ' If it's a derived reference, handle it specially
    
    idx = InStr(var, ".")
    If idx = 0 Then
        ' evaluate v in dest
        On Error Resume Next
        ' don't bother re-evaluating
        EV = EV(dest, dest(var))
        'EV = dest(var)
        If Err = 13 Then
            ' type mismatch - return string instead
            Err = 0
            EV = "'" & CStr(var) & "'"
            Exit Function
        End If
    Else
        Dim ns As String, vn As String
        ' Break v into namespace and variable name (ie "Engine" and "Speed")
        ns = Left$(var, idx - 1)
        vn = Mid$(var, idx + 1)
        'MsgBox "Reference to " & ns & "." & vn
        ' Currently valid namespaces are "Chassis" and "Engine"
        ' This is only to Get a value...
        Select Case ns
            Case "c"
                ns = "Chassis"
            Case "e"
                ns = "Engine"
            Case "g"
                ns = "Global"
            Case "l"
                ns = "Local"
            Case "m"
                ns = "Mods"
        End Select
        
        On Error Resume Next
        value = 0     ' default
        Select Case ns
            Case "Chassis"
                value = v.Chassis.value(vn)
                EV = EV(dest, value)
            Case "Engine"
                value = v.Engine.value(vn)
                EV = EV(dest, value)
            Case "Global"
                value = varG.Item(vn)
                EV = EV(dest, value)
            Case "Local"
                value = varL.Item(vn)
                EV = EV(dest, value)
            Case "Mods"
                ' Mods has an (implicit) index as well
                ' stored in Global.modindex
                'idx = InStr(vn, ".")
                ' for a general case
                'value = v.ModC(EV(d, "Global.modindex")).Value(vn)
                ' for a bit of optimization
                value = v.ModC(varG.Item("modindex")).value(vn)
                EV = EV(dest, value)
        End Select
    End If
End Function

Public Function Find(e As Collection, ec() As String)
Dim idx As Integer
Dim eidx As Integer
Dim limit As Integer
    limit = MAX_EC
    For eidx = 1 To limit
        If ec(eidx) = "" Then limit = eidx
    Next eidx
    For idx = 1 To e.Count      ' cycle through tokens
        For eidx = 1 To limit  ' does it match a token in the expression class?
            If e(idx) = ec(eidx) Then
                GoTo Found
'            ElseIf ec(eidx) = "" Then
'                limit = eidx
''                eidx = MAX_EC
            End If
        Next eidx
    Next idx
    idx = 0
Found:
    Find = idx
End Function

Public Function GetToken(ByRef line As String) As String
Dim l$, r$, s%, q%
    l$ = ""
    s = 0
    q = 0
    
    ' handle quoted spaces
    While q <= s
        s = InStr(q + 1, line, " ")
        q = InStr(q + 1, line, "'")
        If q = 0 Then
            q = Len(line)
        Else
            If q < s Then
                s = InStr(q + 1, line, "'")
                If s <> 0 Then q = s
            End If
        End If
    Wend

    If s > 0 Then
        l$ = Trim$(Left$(line, s - 1))
        line = Trim$(Mid$(line, s + 1))
    Else
        l$ = Trim$(line)
        line = ""
    End If
    GetToken = l$
End Function

