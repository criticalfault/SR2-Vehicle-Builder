VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "ModClass"
Attribute VB_Creatable = True
Attribute VB_Exposed = True
Public ModType As Integer
Public ModName As String        ' Name of mod
Public Priority As Integer      ' 1 = low
Public Markup As Single         ' Markup multiplier
Public Level As Integer         ' Level of mod
Public Label As String          ' label of "levels"
Public Limit As String          ' E: True if within limit
Public expr As String           ' Expr

Public Book As String   ' where's it from?

'Public Cost As String           ' E: Design cost
'Public Load As String           ' E: Load cost
'Public CF As String             ' E: CF cost
'Public Effect As String         ' E: Effect

Public Property Get Value(var As Variant)
    Select Case var
        Case "ModType"
            Value = ModType
        Case "ModName"
            Value = "'" & ModName & "'"
        Case "Priority"
            Value = Priority
        Case "Markup"
            Value = Markup
        Case "Level"
            Value = Level
        Case "Label"
            Value = "'" & Label & "'"
        Case "Limit"
            Value = "'" & Limit & "'"
        Case "Expr"
            Value = "'" & expr & "'"
        Case "Book"
            Value = "'" & Book & "'"
    End Select
End Property
