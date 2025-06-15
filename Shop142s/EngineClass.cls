VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "EngineClass"
Attribute VB_Creatable = True
Attribute VB_Exposed = True
Public EngineName As String
Public Speed As Integer
Public SpeedMax As Integer
Public Accel As Integer
Public AccelMax As Integer
Public Load As Long
Public LoadMax As Long
Public Sig As Integer
Public Economy As Single
Public EconomyMax As Single
Public Fuel As Integer
Public Cost As Integer

Public Book As String   ' where's it from?

Public Property Get Value(var As Variant)
    Select Case var
        Case "EngineName"
            Value = "'" & EngineName & "'"
        Case "Speed"
            Value = Speed
        Case "SpeedMax"
            Value = SpeedMax
        Case "Accel"
            Value = Accel
        Case "AccelMax"
            Value = AccelMax
        Case "Load"
            Value = Load
        Case "LoadMax"
            Value = LoadMax
        Case "Sig"
            Value = Sig
        Case "Economy"
            Value = Economy
        Case "EconomyMax"
            Value = EconomyMax
        Case "Fuel"
            Value = Fuel
        Case "Cost"
            Value = Cost
    End Select
End Property

Public Property Let Value(var As Variant, val As Variant)
    Select Case var
        Case "EngineName"
            EngineName = val
        Case "Speed"
            Speed = val
        Case "SpeedMax"
            SpeedMax = val
        Case "Accel"
            Accel = val
        Case "AccelMax"
            AccelMax = val
        Case "Load"
            Load = val
        Case "LoadMax"
            LoadMax = val
        Case "Sig"
            Sig = val
        Case "Economy"
            Economy = val
        Case "EconomyMax"
            EconomyMax = val
        Case "Fuel"
            Fuel = val
        Case "Cost"
            Cost = val
    End Select
End Property

